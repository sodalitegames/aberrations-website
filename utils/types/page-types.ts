export interface Metadata {
  title: string;
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
