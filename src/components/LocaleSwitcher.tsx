"use client";
import React, { useTransition } from "react";
import { useLocale } from "next-intl";
import { languages, Locale } from "@/i18n/config";
import Dropdown from "react-bootstrap/Dropdown";
import { usePathname, useRouter } from "@/i18n/routing";

function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const languageSelectHandler: React.MouseEventHandler<HTMLElement> = async (
    e
  ) => {
    const nextLocale = e.currentTarget.getAttribute("data-lang") as Locale;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        className="text-light"
        variant="Info"
        id="dropdown-basic"
        disabled={isPending}
      >
        <i className="bi bi-translate "></i>
        {"  "}
        {languages.find((lang) => lang.code === locale)?.name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {languages.map((item) => (
          <Dropdown.Item
            key={item.code}
            data-lang={item.code}
            onClick={languageSelectHandler}
            active={item.code === locale}
          >
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LocaleSwitcher;
