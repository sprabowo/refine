If you need to change locale at runtime, refine provides a `useSetLocale` hook, It returns the changeLocale method from `i18nProvider` under the hood.

## Usage

You can use the features of your own i18n library for change locale in your own components.

```tsx
import { Button, useTranslate } from "@pankod/refine";

export const LanguageSwicher = () => {
    const changeLanguage = useSetLocale();

    return (
        <div>
            <span>Languages</span>
            <Button onClick={() => changeLanguage("en")}>English</Button>
            <Button onClick={() => changeLanguage("es")}>Spanish</Button>
        </div>
    );
};
```

:::caution
This hook can only be used if `i18nProvider` is provided.
:::