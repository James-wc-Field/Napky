"use client";

import { useToast } from "@ui/use-toast";
import { ToastAction } from "@ui/toast";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@ui/dialog";
import { Textarea } from "@ui/textarea";
import { useForm } from "react-hook-form";
import { FeedbackCommentsField } from "@components/FormFields";
import { Form } from "@ui/form";
import { useEffect, useState } from "react";
import { createNewFeedback } from "./api";
import { LoadingSpinner } from "./ui/spinner";

export type FeedbackInput = {
  feedback: string;
};

/**
 * A toast that displays a prompt for user feedback on the site
 */
export default function Page() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isDialogOpen) return;
      toast({
        title: "How are we doing?",
        variant: "default",
        description: "Please take a moment to provide feedback on our site.",
        duration: 120000, // Go away after 2 minutes
        action: (
          <ToastAction altText="Give Feedback" asChild>
            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
              Give Feedback
            </Button>
          </ToastAction>
        ),
      });
    }, 6000); // show up every 10 minutes

    return () => clearInterval(interval);
  }, [toast, isDialogOpen]);

  const form = useForm<FeedbackInput>({
    defaultValues: {
      feedback: "",
    },
  });
  const [waiting, setWaiting] = useState(false);

  async function onSubmit(data: FeedbackInput) {
    setWaiting(true);

    createNewFeedback(data.feedback).then(() => {
      setWaiting(false);
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: "Successfully submitted feedback",
        description:
          "Thank you for your feedback! We'll use it to improve our site.",
        duration: 10000,
      });
    });
  }

  return (
    <div>
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Give Us Feedback</DialogTitle>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
                  <FeedbackCommentsField form={form} />
                  <Button type="submit">
                    Submit
                    {waiting && <LoadingSpinner className="ml-2" />}
                  </Button>
                </form>
              </Form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
