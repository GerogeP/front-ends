"use client";
import { createMessage } from "@/app/actions";
import { useFormState } from "react-dom";
import SubmitButton from "./submit-button";
import { EMPTY_FORM_STATE } from "@/utils/to-form-state";
import { FieldError } from "./field-error";
import { useToastMessage } from "@/hooks/use-toast-message";
import { useFormReset } from "@/hooks/use-form-reset";

const MessageCreateForm = () => {
  const [formState, action] = useFormState(createMessage, EMPTY_FORM_STATE);

  const noScriptFallback = useToastMessage(formState);
  const formRef = useFormReset(formState);

  const handleCreateTicket = async (formData: FormData) => {
    await action(formData);

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <form
      ref={formRef}
      action={handleCreateTicket}
      className="flex flex-col gap-y-2"
    >
      

      <label htmlFor="title">Title</label>
      <input id="title" name="title" className="border-2" />
      <FieldError formState={formState} name="title" />

      <label htmlFor="text">Text</label>
      <textarea id="text" name="text" className="border-2" />
      <FieldError formState={formState} name="text" />

      <SubmitButton label="Create" loading="Creating ..." />

      <span className="font-bold">{formState.message}</span>
    </form>
  );
};

export { MessageCreateForm };
