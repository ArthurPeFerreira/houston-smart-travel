"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GoingBackModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSelect: (isRoundTrip: boolean) => void;
}

export default function GoingBackModal({
  isOpen,
  setIsOpen,
  onSelect,
}: GoingBackModalProps) {
  const handleSelection = (isRoundTrip: boolean) => {
    onSelect(isRoundTrip);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent showCloseButton={false} className="bg-white text-[#00001e] rounded-md w-10/12 h-fit border-none shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Is this a round trip?
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSelection(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-medium transition cursor-pointer"
          >
            Yes, I&apos;m coming back
          </button>
          <button
            onClick={() => handleSelection(false)}
            className="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-md text-white font-medium transition cursor-pointer"
          >
            No, it&apos;s a one-way trip
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
