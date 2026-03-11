export const portfolio = {
  name: 'Shaik Mohsin',
  title: 'Linux Administrator | Azure Cloud | DevOps Enthusiast',
  location: 'Bangalore, India',
  email: 'shaikmohsin1026@gmail.com',
  linkedin: 'linkedin.com/in/shaik-mohsin-23b406350',
  github: 'Codeman-mohsin',
  resumeHref: '/resume.pdf',
  terminalLines: [
    'sudo systemctl start devops-career',
    'docker run success',
    'kubectl get pods --all-namespaces',
    'terraform apply -auto-approve',
  ],
  about: [
    'I’m a Junior DevOps Enthusiast and Linux Administrator based in Bangalore, India, who loves building reliable, automated infrastructure.',
    'I am a motivated BCA graduate with hands-on project experience in Linux administration, CI/CD pipelines, and application deployment. I am eager to leverage foundational knowledge of release workflows and configuration management in a cloud engineering role.',
  ],
  skills: [
    { name: 'Linux (Ubuntu, CentOS, RHEL)', level: 85, tag: 'linux' },
    { name: 'Git & GitHub Workflows', level: 85, tag: 'git' },
    { name: 'Bash & PowerShell Basics', level: 80, tag: 'bash' },
    { name: 'Nginx Configuration', level: 75, tag: 'web' },
    { name: 'Networking (TCP/IP, DNS, DHCP)', level: 80, tag: 'linux' },
    { name: 'Docker Foundational', level: 60, tag: 'docker' },
    { name: 'Azure Fundamentals', level: 65, tag: 'azure' },
    { name: 'Jenkins CI/CD Basics', level: 50, tag: 'cicd' },
    { name: 'Terraform Basics', level: 50, tag: 'terraform' },
  ],
  projects: [
    {
      name: 'FlexWork – Part-Time Job Platform',
      description:
        'A web platform to help students find jobs. I managed Git source code workflows, set up Nginx as a reverse proxy, and deployed the React frontend and Django backend on VirtualBox Ubuntu/CentOS VMs. Resolved 10+ deployment and configuration issues including permission errors and service configuration problems.',
      tech: ['Linux', 'Ubuntu', 'CentOS', 'Nginx', 'VirtualBox', 'SQLite', 'Git'],
      githubUrl: 'https://github.com/Codeman-mohsin/flexwork',
    },
    {
      name: 'LBS Gazette – Web News Platform',
      description:
        'A web-based news platform. I supported infrastructure setup and backend deployment by managing code updates through Git, assisting with Django deployment on Linux servers, monitoring logs, and resolving configuration issues and port conflicts during deployments.',
      tech: ['Linux', 'Django', 'Git', 'Troubleshooting', 'System Logs'],
      githubUrl: 'https://github.com/Codeman-mohsin/lbs-gazette',
    },
  ],
  tools: [
    { name: 'Docker', tag: 'docker' as const },
    { name: 'Kubernetes', tag: 'kubernetes' as const },
    { name: 'Azure', tag: 'azure' as const },
    { name: 'Terraform', tag: 'terraform' as const },
    { name: 'Git', tag: 'git' as const },
    { name: 'Jenkins', tag: 'jenkins' as const },
    { name: 'Linux', tag: 'linux' as const },
  ],
  journey: [
    {
      title: 'Linux foundations',
      desc: 'Users, permissions, services, networking, logs, and automation with Bash.',
    },
    {
      title: 'Containerization with Docker',
      desc: 'Images, registries, compose, troubleshooting, and optimizing dev/prod parity.',
    },
    {
      title: 'Kubernetes basics',
      desc: 'Deployments, services, ingress, config/secrets, and cluster debugging workflows.',
    },
    {
      title: 'Azure cloud exploration',
      desc: 'Core Azure services, networking, identity, and building cloud-ready architectures.',
    },
    {
      title: 'CI/CD & IaC',
      desc: 'Pipelines, GitHub workflows, Terraform modules, and repeatable deployments.',
    },
  ],
} as const

