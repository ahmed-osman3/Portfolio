"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Contact, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contactSchema } from "@/lib/schema";
import { useFormState } from "react-dom";
import { sendEmail } from "@/lib/mailAction";
import { toast } from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactFormDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, formAction] = useFormState(sendEmail, {
    message: "",
    type: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    toast.dismiss("loading");
    if (state.message == "") return;
    if (state.type == "error") {
      toast.error(state.message);
    } else {
      toast.success("Message Sent !");
      setOpen(false);
    }
  }, [state]);

  return (
    <>
      <button
        onClick={handleOpen}
        className="rounded-full border border-solid border-white/[.145] hover:bg-white/[.145] transition-colors flex items-center justify-center hover:border-transparent text-sm sm:text-base w-28 h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
      >
        Contact Me
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-gradient-to-br from-[#4c547e] to-[#3a4161] text-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-soft-light pointer-events-none"></div>
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X size={24} />
              </button>
              <h2 className="text-3xl font-bold mb-6 text-center">
                Contact Me
              </h2>
              <form
                action={formAction}
                className="space-y-6"
                onSubmit={(evt) => {
                  evt.preventDefault();

                  form.handleSubmit((data) => {
                    const formData = new FormData();
                    Object.entries(data).forEach(([key, value]) => {
                      if (Array.isArray(value)) {
                        formData.append(key, value.join(","));
                      } else {
                        formData.append(key, value.toString());
                      }
                    });
                    toast.loading("Loading", {
                      id: "loading",
                    });
                    formAction(formData);
                  })(evt);
                }}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-white/80"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...form.register("name")}
                    required
                    className="w-full px-4 py-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009080] transition-all duration-300 text-white placeholder-white/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-white/80"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...form.register("email")}
                    required
                    className="w-full px-4 py-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009080] transition-all duration-300 text-white placeholder-white/50"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-white/80"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...form.register("message")}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009080] transition-all duration-300 text-white placeholder-white/50 resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 text-white/80 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-[#009080] to-[#00c4a7] rounded-lg hover:from-[#007a6a] hover:to-[#00a38c] transition-colors duration-300 text-white font-medium"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
