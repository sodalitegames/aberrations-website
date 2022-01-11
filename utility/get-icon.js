import {
  BookmarkAltIcon,
  DesktopComputerIcon,
  PlayIcon,
  UserGroupIcon,
  SupportIcon,
  GlobeIcon,
  DocumentTextIcon,
  BookOpenIcon,
  CollectionIcon,
  MailIcon,
  ChartSquareBarIcon,
  SparklesIcon,
  ExternalLinkIcon,
  DatabaseIcon,
  CubeTransparentIcon,
  FingerPrintIcon,
} from '@heroicons/react/outline';

const ICON_MAP = {
  BookmarkAltIcon: BookmarkAltIcon,
  DesktopComputerIcon: DesktopComputerIcon,
  PlayIcon: PlayIcon,
  UserGroupIcon: UserGroupIcon,
  SupportIcon: SupportIcon,
  GlobeIcon: GlobeIcon,
  DocumentTextIcon: DocumentTextIcon,
  BookOpenIcon: BookOpenIcon,
  CollectionIcon: CollectionIcon,
  MailIcon: MailIcon,
  ChartSquareBarIcon: ChartSquareBarIcon,
  SparklesIcon: SparklesIcon,
  ExternalLinkIcon: ExternalLinkIcon,
  DatabaseIcon: DatabaseIcon,
  CubeTransparentIcon: CubeTransparentIcon,
  FingerPrintIcon: FingerPrintIcon,
};

export const getIcon = iconRef => {
  const icon = { icon: ICON_MAP[iconRef] };
  if (!icon) icon.icon = DocumentTextIcon;
  return icon;
};
