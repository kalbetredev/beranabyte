const pageSlugs = {
  blogsPage: "/blogs",
  projectsPage: "/projects",
  aboutPage: "/about",
  contactPage: "/contact",
  accountSettingsPage: "/account-settings",
  signUpPageSlug: (continue_to?: string) =>
    `/signup${continue_to != "/" ? "?continue_to=" + continue_to : ""}`,
  signInPageSlug: (continue_to?: string) =>
    `/signin${continue_to != "/" ? "?continue_to=" + continue_to : ""}`,
  passwordRestPageSlug: (continue_to?: string) =>
    `/password-reset${continue_to != "/" ? "?continue_to=" + continue_to : ""}`,
};

export default pageSlugs;
