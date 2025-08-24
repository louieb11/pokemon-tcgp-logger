// src/components/DeckSelector.tsx
'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Deck } from '@/types';
import DeckIconGroup from './DeckIconGroup';

interface DeckSelectorProps {
  decks: Deck[];
  selectedDeck: Deck;
  setSelectedDeck: (deck: Deck) => void;
}

export default function DeckSelector({ decks, selectedDeck, setSelectedDeck }: DeckSelectorProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-gray-700 hover:bg-gray-600 text-white border-gray-600 h-12"
        >
          <span className="flex items-center gap-3 truncate">
            <DeckIconGroup iconIdentifiers={selectedDeck.iconIdentifiers} />
            {selectedDeck.name}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[330px] p-0 bg-gray-800 border-gray-600 text-white">
        <Command>
          <CommandInput placeholder="Search decks..." className="border-gray-600 focus:ring-blue-500" />
          <CommandList>
            <CommandEmpty>No deck found.</CommandEmpty>
            <CommandGroup>
              {decks.map((deck) => (
                <CommandItem
                  key={deck.id}
                  value={deck.name}
                  onSelect={(currentValue) => {
                    const selected = decks.find(d => d.name.toLowerCase() === currentValue.toLowerCase());
                    if (selected) {
                      setSelectedDeck(selected);
                    }
                    setOpen(false);
                  }}
                  className="aria-selected:bg-blue-500/50"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedDeck.id === deck.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex items-center gap-3">
                    <DeckIconGroup iconIdentifiers={deck.iconIdentifiers} />
                    {deck.name}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}