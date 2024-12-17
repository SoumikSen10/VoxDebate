import React, { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const ManualSearch = () => {
  const [query, setQuery] = useState("");

  const faqs = [
    "How to clone my voice?",
    "How to adjust the tone of my voice?",
    "Can I upload multiple voice samples?",
    "What formats are supported for voice input?",
    "How do I delete my saved voices?",
    "How to reset my account settings?",
  ];

  // Filter FAQ based on the query entered
  const filteredFAQs = faqs.filter((faq) =>
    faq.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full p-6 rounded-lg shadow-md mb-8">
      <Command>
        <CommandInput
          placeholder="Search for answers to your questions..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-4 rounded-lg text-lg focus:ring-2 focus:ring-orange-500 placeholder:text-gray-500 transition-all"
        />
        <CommandList>
          {filteredFAQs.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <CommandGroup heading="Frequently Asked Questions">
              {filteredFAQs.map((faq, index) => (
                <CommandItem
                  key={index}
                  className="hover:bg-orange-100 transition-all"
                >
                  {faq}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  );
};

export default ManualSearch;
