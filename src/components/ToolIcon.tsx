import {
  SiApache,
  SiDocker,
  SiGithub,
  SiGit,
  SiJenkins,
  SiKubernetes,
  SiLinux,
  SiNginx,
  SiTerraform,
} from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'

type Tag =
  | 'linux'
  | 'docker'
  | 'kubernetes'
  | 'azure'
  | 'terraform'
  | 'git'
  | 'github'
  | 'jenkins'
  | 'nginx'
  | 'apache'

export function ToolIcon({ tag, className = '' }: { tag: Tag; className?: string }) {
  const common = { className }
  switch (tag) {
    case 'linux':
      return <SiLinux {...common} />
    case 'docker':
      return <SiDocker {...common} />
    case 'kubernetes':
      return <SiKubernetes {...common} />
    case 'azure':
      return <VscAzure {...common} />
    case 'terraform':
      return <SiTerraform {...common} />
    case 'git':
      return <SiGit {...common} />
    case 'github':
      return <SiGithub {...common} />
    case 'jenkins':
      return <SiJenkins {...common} />
    case 'nginx':
      return <SiNginx {...common} />
    case 'apache':
      return <SiApache {...common} />
  }
}

