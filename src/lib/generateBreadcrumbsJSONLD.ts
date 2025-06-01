import type { BreadcrumbList, ListItem, WithContext } from "schema-dts";
export type BreadcrumbEntry = { href: string; children: string };
export function generateBreadcrumbsJSONLD(
  breadcrumbs: BreadcrumbEntry[],
  baseUrl: string | URL,
  autonesting = false,
) {
  const breadcrumbList = breadcrumbs.map(
    (breadcrumb, index, array): ListItem => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.children,
      item: new URL(
        autonesting && index > 0
          ? (array.at(index - 1)?.href.concat(breadcrumb.href) as string) // we checked the index so this cast is for TS
          : breadcrumb.href,
        baseUrl,
      ).toString(),
    }),
  );

  const jsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList,
  };

  return JSON.stringify(jsonLd);
}
