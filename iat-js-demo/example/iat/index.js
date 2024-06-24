(function () {
  let btnStatus = "UNDEFINED"; // "UNDEFINED" "CONNECTING" "OPEN" "CLOSING" "CLOSED"

  const btnControl = document.getElementById("btn_control");

  const recorder = new RecorderManager("../../dist");
  recorder.onStart = () => {
    changeBtnStatus("OPEN");
  };

  let iatWS;
  let resultText = "";
  let resultTextTemp = "";
  let countdownInterval;

  const APPID = "cf59a587";
  /**
   * 获取websocket url
   * 该接口需要后端提供，这里为了方便前端处理
   */
  async function getWebSocketUrl() {
    // const url = "http://101.35.200.235:8080/iat/url";

    try {
      const response = await fetch("http://101.35.200.235:8080/iat/url");
      const result = response.text();
      console.log(result);
      return await result;
    } catch (error) {
      console.log(error);
    }
  }

  function toBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  function countdown() {
    let seconds = 60;
    btnControl.innerText = `录音中（${seconds}s）`;
    countdownInterval = setInterval(() => {
      seconds = seconds - 1;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        recorder.stop();
      } else {
        btnControl.innerText = `录音中（${seconds}s）`;
      }
    }, 1000);
  }

  function changeBtnStatus(status) {
    btnStatus = status;
    if (status === "CONNECTING") {
      btnControl.innerText = "建立连接中";
      document.getElementById("result").innerText = "";
      resultText = "";
      resultTextTemp = "";
    } else if (status === "OPEN") {
      countdown();
    } else if (status === "CLOSING") {
      btnControl.innerText = "关闭连接中";
    } else if (status === "CLOSED") {
      btnControl.innerText = "开始录音";
    }
  }

  function renderResult(resultData) {
    // 识别结束
    let jsonData = JSON.parse(resultData);
    if (jsonData.data && jsonData.data.result) {
      let data = jsonData.data.result;
      let str = "";
      let ws = data.ws;
      for (let i = 0; i < ws.length; i++) {
        str = str + ws[i].cw[0].w;
      }
      // 开启wpgs会有此字段(前提：在控制台开通动态修正功能)
      // 取值为 "apd"时表示该片结果是追加到前面的最终结果；取值为"rpl" 时表示替换前面的部分结果，替换范围为rg字段
      if (data.pgs) {
        if (data.pgs === "apd") {
          // 将resultTextTemp同步给resultText
          resultText = resultTextTemp;
        }
        // 将结果存储在resultTextTemp中
        resultTextTemp = resultText + str;
      } else {
        resultText = resultText + str;
      }
      document.getElementById("result").innerText =
        resultTextTemp || resultText || "";
    }
    if (jsonData.code === 0 && jsonData.data.status === 2) {
      iatWS.close();
    }
    if (jsonData.code !== 0) {
      iatWS.close();
      console.error(jsonData);
    }
  }

  async function connectWebSocket() {
    const websocketUrl = await getWebSocketUrl();
    // const websocketUrl =
    //   "wss://ws-api.xfyun.cn/v2/iat?authorization=YXBpX2tleT0iZTY0YWM1MzRiYjc5OWZlMmY0YjgwZTk3MTE1MDRjZjgiLCBhbGdvcml0aG09ImhtYWMtc2hhMjU2IiwgaGVhZGVycz0iaG9zdCBkYXRlIHJlcXVlc3QtbGluZSIsIHNpZ25hdHVyZT0iSC9aMDdmaFl1TzdNMmhZbEMrZTg1MTNNSzR1Q2dqSWxWTjRuRU5OQStRbz0i&date=Fri%2C+14+Jun+2024+02%3A56%3A19+GMT&host=ws-api.xfyun.cn";

    console.log("websocketUrl: ", websocketUrl);
    if ("WebSocket" in window) {
      iatWS = new WebSocket(websocketUrl);
    } else if ("MozWebSocket" in window) {
      iatWS = new MozWebSocket(websocketUrl);
    } else {
      alert("浏览器不支持WebSocket");
      return;
    }
    changeBtnStatus("CONNECTING");
    iatWS.onopen = (e) => {
      // 开始录音
      recorder.start({
        sampleRate: 16000,
        frameSize: 1280,
      });
      var params = {
        common: {
          app_id: APPID,
        },
        business: {
          language: "zh_cn",
          domain: "iat",
          accent: "mandarin",
          vad_eos: 5000,
          dwa: "wpgs",
        },
        data: {
          status: 0,
          format: "audio/L16;rate=16000",
          encoding: "raw",
        },
      };
      iatWS.send(JSON.stringify(params));
    };
    iatWS.onmessage = (e) => {
      renderResult(e.data);
    };
    iatWS.onerror = (e) => {
      console.error(e);
      recorder.stop();
      changeBtnStatus("CLOSED");
    };
    iatWS.onclose = (e) => {
      recorder.stop();
      changeBtnStatus("CLOSED");
    };
  }

  recorder.onFrameRecorded = ({ isLastFrame, frameBuffer }) => {
    if (iatWS.readyState === iatWS.OPEN) {
      iatWS.send(
        JSON.stringify({
          data: {
            status: isLastFrame ? 2 : 1,
            format: "audio/L16;rate=16000",
            encoding: "raw",
            audio: toBase64(frameBuffer),
          },
        })
      );
      if (isLastFrame) {
        changeBtnStatus("CLOSING");
      }
    }
  };
  recorder.onStop = () => {
    clearInterval(countdownInterval);
  };

  btnControl.onclick = function () {
    if (btnStatus === "UNDEFINED" || btnStatus === "CLOSED") {
      connectWebSocket();
    } else if (btnStatus === "CONNECTING" || btnStatus === "OPEN") {
      // 结束录音
      recorder.stop();
    }
  };
})();
