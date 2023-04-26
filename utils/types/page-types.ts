export interface Metadata {
  title: string;
  slug: string;
  description?: string;
  // ... add in rest
}

export interface SideNavItem {
  name: string;
  idRef: string;
  current?: boolean;
  children?: SideNavItem[];
}

export interface Breadcrumb {
  name: string;
  href: string;
}
