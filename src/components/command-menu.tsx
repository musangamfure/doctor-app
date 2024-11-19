"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { type DialogProps } from "@radix-ui/react-dialog";
import { FileIcon, Search } from "lucide-react";
import { getDoctorsBySearch, SearchDataProps } from "../../actions/doctors";
import { docsConfig } from "../../config/docs";
import { cn } from "@/lib/utils";
import { Button } from "../components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../components/ui/command";

export async function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<SearchDataProps>({
    doctors: undefined,
    specialties: [],
    symptoms: [],
    services: [],
  });

  const data = (await getDoctorsBySearch(query)) as SearchDataProps;
  const doctors = data?.doctors;
  const specialities = data?.specialties;
  const symptoms = data?.symptoms;
  const services = data?.services;

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runSearch = React.useCallback(async (searchQuery: string) => {
    try {
      const results = await getDoctorsBySearch(searchQuery);
      if (results) {
        setSearchResults(results);
      } else {
        setSearchResults({
          doctors: undefined,
          specialties: [],
          symptoms: [],
          services: [],
        });
      }
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults({
        doctors: undefined,
        specialties: [],
        symptoms: [],
        services: [],
      });
    }
  }, []);

  const debouncedSearch = React.useCallback(
    React.useMemo(
      () =>
        debounce((value: string) => {
          if (value.trim()) {
            runSearch(value.trim());
          } else {
            setSearchResults({
              doctors: undefined,
              specialties: [],
              symptoms: [],
              services: [],
            });
          }
        }, 300),
      [runSearch]
    ),
    [runSearch]
  );

  React.useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-14 w-full justify-start rounded-[2rem] text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-full"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <Search className="absolute left-3 top-4 h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span className="hidden ml-6 lg:inline-flex">Mental Health...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.5rem] hidden h-5 select-none items-center gap-1  px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search doctors..."
          value={query}
          onValueChange={(value) => setQuery(value)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {((searchResults.doctors && searchResults.doctors.length > 0) ||
            searchResults.specialties.length > 0 ||
            searchResults.symptoms.length > 0 ||
            searchResults.services.length > 0) && (
            <CommandGroup heading="Search Results">
              <CommandItem
                onSelect={() => {
                  router.push(`/search?query=${encodeURIComponent(query)}`);
                  setOpen(false);
                }}
              >
                View all search results for "{query}"
              </CommandItem>
            </CommandGroup>
          )}
          <CommandSeparator />
          <CommandGroup heading="Quick Links">
            {docsConfig.mainNav
              .filter((navitem) => !navitem.external)
              .map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  onSelect={() => {
                    router.push(navItem.href as string);
                    setOpen(false);
                  }}
                >
                  <FileIcon className="mr-2 h-4 w-4" />
                  {navItem.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Services">
            {services.map((service, i) => (
              <CommandItem
                key={i}
                onSelect={() => {
                  router.push(`/service/${service.slug}`);
                  setOpen(false);
                }}
              >
                <FileIcon className="mr-2 h-4 w-4" />
                {service.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };

  return debounced as T & { cancel: () => void };
}
