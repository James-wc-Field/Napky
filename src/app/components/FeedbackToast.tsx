"use client";

import { useToast } from "@ui/use-toast";
import { ToastAction } from "@ui/toast";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ui/dialog";
import { Label } from "@ui/label";
import { Textarea } from "@ui/textarea";

import { useEffect, useState } from "react";

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
        action: (
          <ToastAction altText="Give Feedback" asChild>
            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
              Give Feedback
            </Button>
          </ToastAction>
        ),
      });
    }, 300000); // show up every 5 minutes

    return () => clearInterval(interval);
  }, [toast, isDialogOpen]);

  const [commentRows, setCommentRows] = useState(2);
  const handleOnCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let numRows = 0;
    let rows = e.target.value.split("\n");

    // let cols = e.target.cols; // TODO: Increase row count if text wrapped to next line
    for (let i = 0; i < rows.length; i++) {
      numRows++;
    }

    // Clamp rows from 2 to 15
    if (numRows < 2) numRows = 2;
    if (numRows > 15) numRows = 15;
    setCommentRows(numRows);
  }

  return (
    <div>
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Give Us Feedback</DialogTitle>
              <DialogDescription className="flex flex-col gap-3">
                {/* TODO: Implement form similar to that of SignInForm.tsx */}

                <Label htmlFor="feedback">Your comments</Label>
                <Textarea id="feedback" rows={commentRows} onChange={handleOnCommentChange} />
                <p>Your feedback helps us improve our site. Thank you!</p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
