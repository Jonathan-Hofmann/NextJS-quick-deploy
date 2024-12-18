# Base Project
This project is meant to be used as a start for any new projects made with Next.JS, shadcn/ui and supabase (auth & database).

## Using this template
### 1. Update `.env.local` inside the root folder.
Add or edit the `.env.local` and add the following to it.

```env
NEXT_PUBLIC_SUPABASE_URL=https://{YOUR-SUPABASE-ID}.supabase.co/
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-SUPABASE-ANON-KEY
```

> You can find your API keys under the following link: [API Keys](https://supabase.com/dashboard/project/_/settings/api)

### 2. Update the `src/contexts/auth.tsx`
Per default for `/app/...` the user needs to be authenticated. If not a fullscreen login UI will be presented.

If a different slug should be protected just change the `PROTECTED_SLUG` variable. 

### 3. Updating the default theme
Per default the base theme shadcn/ui and tailwindcss is using is the `zinc` colors. If you want to change that you can change the predefined colors in the `/src/app/globals.css`. 

A good site to create your custom theme is the [shadcn/ui themes page](https://ui.shadcn.com/themes).

## Using the Base Project
### Using the authenticated user within the app
Within the website you can get the current user with the following code
```typescript
import { useAuth } from "@/contexts/auth";

const Component = () => {
    const auth = useAuth()

    // If no user is logged in auth.user will be null else it holds the current user in the session.
    const curr_user = auth.user;

    return(
        <p>{curr_user?.id ?? "not logged in."}</p>
    )
}
```

### Using supabase
If you want to use supabase in your project (for DB access and more) you should use the exported `supabase` variable from `/src/lib/supabase.ts` to access the supabase api.

## Contribution
Feel free to use this base project in your future projects. 

If you want to contribute to this repo just clone it and make a pull request with your changes. 

And now happy coding!
