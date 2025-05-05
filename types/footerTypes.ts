import { ReactNode } from "react";

interface LinkItem {
    label: string;
    href: string;
  }
  
  interface SocialLinkItem extends LinkItem {
    icon: ReactNode;
  }
  
export   interface FooterData {
    explore: LinkItem[];
    help: LinkItem[];
    social: SocialLinkItem[];
    apps: LinkItem[];
  }
  
export  interface FooterLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
  }
  
 export interface FooterListItemProps {
    href: string;
    children: ReactNode;
  }
  
 export interface SocialLinkProps {
    href: string;
    icon: ReactNode;
    label: string;
  }