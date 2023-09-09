/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import flowify from './assets/img/flowify.png';
import github from './assets/img/github.png';

import admin_example from './assets/img/admin_example.png';
import admin_video_preview from './assets/img/admin_site_flow_preview.jpeg';
import admin_video from './assets/video/admin_site_flow.mp4';

import photo_anton from './assets/img/team/anton_b.jpeg';
import photo_evgenij from './assets/img/team/evgenij_u.jpeg';
import photo_ruslan from './assets/img/team/ruslan_z.jpeg';
import photo_nikita from './assets/img/team/nikita_g.jpeg';
import photo_maksim from './assets/img/team/maksim_m.jpeg';
import photo_alina from './assets/img/team/alina_g.jpeg';
import photo_andrey from './assets/img/team/andrey_k.jpeg';

export const PRODUCT_LINK = 'product';
export const CONNECT_LINK = 'connect';
export const ABOUT_US_LINK = 'about-us';
export const FEATURES_LINK = 'features';
export const ROADMAP_LINK = 'roadmap';
export const OUR_TEAM_LINK = 'our-team';

const product1 = {
  title: 'AI-driven Workflow',
  imageLink: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*OnyWT4Nsxy0AAAAAAAAAAABjARQnAQ',
  content: "Are you ready to streamline your data processing activities and work smarter, not harder? Flowify is here to transform the way you handle workflows with its powerful and intuitive AI-driven workflows. It serves as the central hub for managing data processing activities, ensuring a seamless and organized workflow. With Flowify, you\'re not just managing workflows; you\'re optimizing them for peak efficiency. Embrace the future of AI-driven workflow management and elevate your data processing to new heights.",
  subTitle: 'When Flowify works hard...',
  buttonText: 'To be delivered soon...',
  buttonLink: '#',
  buttonDisabled: true
};

const product2 = {
  title: 'Administration Panel',
  imageLink: admin_example,
  content: 'Our intuitive web-based admin console makes ticket workflow management a piece of cake. No more headaches or hassles; just a smooth, streamlined process.'
    + 'The Data Workflow Admin Web Console is your secret weapon for simplifying data management. It\'s designed to empower administrators like you with a suite of tools to create, update, and monitor data workflows effortlessly.'
    + 'With Flowify, you\'ll never miss a beat. Keep your data handling organized and efficient, ensuring that every issue is addressed promptly.',
  subTitle: '... you work smart',
  buttonText: 'To be delivered soon...',
  buttonLink: '#',
  buttonDisabled: true
};

const demoSection = {
  title: 'Demo',
  subTitle: 'Check 18+ video how xoxol fuck CEO',
  video1Link: 'https://os.alipayobjects.com/rmsportal/EejaUGsyExkXyXr.mp4',
  video2Link: admin_video,
  video1Preview: 'https://zos.alipayobjects.com/rmsportal/HZgzhugQZkqUwBVeNyfz.jpg',
  video2Preview: admin_video_preview,
  video1Title: 'Client Application',
  video2Title: 'Admin Application'
};

const aboutUsSection = {
  title: 'Effortless Data Workflow Management',
  content: 'Welcome to Flowify, where data management becomes a breeze with our user-friendly administration panel.',
  smallContent: 'Say goodbye to the complexities of data workflows and hello to seamless, efficient operations.'
};

const featuresSection = {
  title: 'Features Flowify Offers Right Now',
  content: 'At Flowify, we\'re all about delivering practical solutions for your workflow needs. Here\'s what Flowify can do for you today',
  feature1: {
    title: 'AI-Driven Workflow: Seamless Intelligence On and Offline',
    content: 'Experience the power of AI-driven workflow management like never before with our Offline (Tensorflow) and Online (OpenAI) modes. Our cutting-edge technology ensures that you stay productive and efficient, regardless of your connectivity status.'
  },
  feature2: {
    title: 'Isolated Workflow Environment: Your Personal Data Fortress',
    content: 'Our Isolated Workflow Environment is designed with one thing in mind: security and trust. This feature allows you to create a dedicated workspace where you can work exclusively with your personal data model, ensuring the utmost privacy and familiarity.'
  },
  feature3: {
    title: 'ChatBot: Your Interactive Feedback Companion',
    content: 'Our ChatBot feature revolutionizes the way you communicate, ensuring a seamless and interactive experience for gathering feedback, classifying data, and planning future workflow runs. It impowers you to maintain a strong connection with your users, improving data quality, and ensuring that your workflows are always on point. Say hello to interactive communication and a more efficient workflow management process.'
  },
  feature4: {
    title: 'Manual Reclassify with AI Reinforcement Learning: Elevate Data Classification',
    content: 'Our Manual Reclassify with Reinforcement Learning feature empowers you to take control of your data classification process like never before. It\'s the ultimate tool for efficiently categorizing all uncategorized data flows through the power of AI-driven reinforcement learning.'
  },
  feature5: {
    title: 'Data Streamline API: Supercharge Your Workflow',
    content: 'Our Data Streamline API is the key to unlocking lightning-fast data processing and workflow initiation. With this feature, you can seamlessly stream data through a public API, turbocharging your workflow and ensuring that you start your processes at the speed of light.'
  },
  feature6: {
    title: 'Workflow Automation Steps: The Power to Enhance Efficiency',
    content: 'Our Workflow Automation Steps feature is your secret weapon for achieving unparalleled efficiency in your processes. It\'s designed to seamlessly identify and address data gaps, ensuring that your workflows move forward without a hitch, whether through direct chat collaboration or our intuitive Administration panel.'
  }
};

const roadmapSection = {
  title: 'Roadmap',
  step1: {
    name: 'Microsoft Teams Integration',
    post: 'This feature will take your collaboration to the next level.',
    time: 'Q1 2024 year',
    title: 'Interactive Collaboration Through Microsoft Teams',
    content: 'With this feature, you\'ll be able to seamlessly integrate Flowify with Microsoft Teams, enhancing your team\'s ability to work together efficiently and effectively.'
  },
  step2: {
    name: 'Jira and Zendesk Integration',
    post: 'This feature will revolutionize your workflow management.',
    time: 'Q2 2024 year',
    title: 'Tickets Streaming from Jira and Zendesk',
    content: 'With this feature, you\'ll be able to seamlessly integrate Flowify with your Jira and Zendesk platforms, streamlining your ticket management process and ensuring that you have real-time access to critical information.'
  },
  step3: {
    name: 'Custom Categorization',
    post: 'This feature will give you even greater control and flexibility.',
    time: 'Q2 2024 year',
    title: 'Enhanced Administration Panel for Custom Categorization',
    content: 'This feature is designed to empower you with the ability to fine-tune and review categorizations that were generated by AI but require human intervention for workflow adoption.'
  },
  step4: {
    name: 'Virtual Assistant',
    post: 'This feature will be your go-to guide for maximizing the potential of your workflow.',
    time: 'Q3 2024 year',
    title: 'Virtual Assistant Emily - Your Workflow Wizard',
    content: 'Emily is designed to be your workflow wizard, walking administrators through the panel and suggesting interactions for automation.'
  }
};

export const Nav00DataSource = {
  wrapper: { className: 'header0 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header0-logo',
    children: flowify
  },
  Menu: {
    className: 'header0-menu',
    children: [
      {
        name: 'item1',
        className: 'header0-item',
        children: {
          href: `#${ABOUT_US_LINK}`,
          children: [{ children: 'About Us', name: 'text' }]
        }
      },
      {
        name: 'item0',
        className: 'header0-item',
        children: {
          href: `#${PRODUCT_LINK}`,
          children: [{ children: 'Product', name: 'text' }]
        }
      },
      {
        name: 'item2',
        className: 'header0-item',
        children: {
          href: `#${FEATURES_LINK}`,
          children: [{ children: 'Features', name: 'text' }]
        }
      },
      {
        name: 'item3',
        className: 'header0-item',
        children: {
          href: `#${ROADMAP_LINK}`,
          children: [{ children: 'Roadmap', name: 'text' }]
        }
      },
      {
        name: 'item5',
        className: 'header0-item',
        children: {
          href: `#${OUR_TEAM_LINK}`,
          children: [{ children: 'Our Team', name: 'text' }]
        }
      }
    ]
  },
  mobileMenu: { className: 'header0-mobile-menu' }
};

export const Banner00DataSource = {
  wrapper: { className: 'banner0' },
  textWrapper: { className: 'banner0-text-wrapper' },
  title: {
    className: 'banner0-title',
    children: flowify
  },
  content: {
    className: 'banner0-content',
    children: 'AI-driven Workflow Classification System '
  },
  button: {
    className: 'banner0-button',
    children: 'Connect',
    href: `#${CONNECT_LINK}`
  }
};

export const Pricing00DataSource = {
  id: PRODUCT_LINK,
  wrapper: { className: 'home-page-wrapper pricing0-wrapper' },
  OverPack: { playScale: 0.3, className: 'home-page pricing0' },
  imgWrapper: { className: 'pricing0-img-wrapper', md: 12, xs: 24 },
  img: {
    className: 'pricing0-img',
    name: 'image',
    children: product1.imageLink
  },
  childWrapper: {
    className: 'pricing0-text-wrapper',
    md: 12,
    xs: 24,
    children: [
      {
        name: 'title',
        children: product1.title,
        className: 'pricing0-title'
      },
      {
        name: 'content',
        children: product1.content,
        className: 'pricing0-content'
      },
      { name: 'pricing', children: product1.subTitle, className: 'pricing0-pricing' },
      {
        name: 'button',
        children: {
          href: product1.buttonLink,
          type: 'primary',
          disabled: product1.buttonDisabled,
          children: product1.buttonText
        }
      }
    ]
  }
};

export const Pricing01DataSource = {
  wrapper: { className: 'home-page-wrapper pricing0-wrapper' },
  OverPack: { playScale: 0.3, className: 'home-page pricing0' },
  imgWrapper: { className: 'pricing0-img-wrapper', md: 12, xs: 24 },
  img: {
    className: 'pricing0-img',
    name: 'image',
    children: product2.imageLink
  },
  childWrapper: {
    className: 'pricing0-text-wrapper',
    md: 12,
    xs: 24,
    children: [
      {
        name: 'title',
        children: product2.title,
        className: 'pricing0-title'
      },
      {
        name: 'content',
        children: product2.content,
        className: 'pricing0-content'
      },
      { name: 'pricing', children: product2.subTitle, className: 'pricing0-pricing' },
      {
        name: 'button',
        children: {
          href: product2.buttonLink,
          type: 'primary',
          disabled: product1.buttonDisabled,
          children: product2.buttonText
        }
      }
    ]
  }
};

export const Content40DataSource = {
  wrapper: { className: 'home-page-wrapper content4-wrapper' },
  page: { className: 'home-page content4' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: demoSection.title,
        className: 'title-h1'
      },
      {
        name: 'content',
        className: 'title-content content4-title-content',
        children: demoSection.subTitle
      }
    ]
  },
  video1Title: {
    children: [
      {
        name: 'content',
        className: 'title-content content4-title-content',
        children: demoSection.video1Title
      }
    ]
  },
  video1: {
    className: 'content4-video',
    children: {
      video: demoSection.video1Link,
      image: demoSection.video1Preview
    }
  },
  video2Title: {
    children: [
      {
        name: 'content',
        className: 'title-content content4-title-content',
        children: demoSection.video2Title
      }
    ]
  },
  video2: {
    className: 'content4-video',
    children: {
      video: demoSection.video2Link,
      image: demoSection.video2Preview
    }
  }
};

export const Content130DataSource = {
  id: ABOUT_US_LINK,
  OverPack: {
    className: 'home-page-wrapper content13-wrapper lmb7ztoc1wo-editor_css',
    playScale: [0.3, 0.3]
  },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'image',
        children:
          'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
        className: 'title-image'
      },
      { name: 'title', children: aboutUsSection.title, className: 'title-h1' },
      {
        name: 'content',
        children: aboutUsSection.content,
        className: 'title-content'
      },
      {
        name: 'content2',
        children: aboutUsSection.smallContent,
        className: 'title-content'
      }
    ]
  }
};

export const Content30DataSource = {
  id: FEATURES_LINK,
  wrapper: { className: 'home-page-wrapper content3-wrapper' },
  page: { className: 'home-page content3' },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: featuresSection.title,
        className: 'title-h1'
      },
      {
        name: 'content',
        className: 'title-content',
        children: featuresSection.content
      }
    ]
  },
  block: {
    className: 'content3-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png'
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: featuresSection.feature1.title },
          content: {
            className: 'content3-content',
            children: featuresSection.feature1.content
          }
        }
      },
      {
        name: 'block1',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png'
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: featuresSection.feature2.title },
          content: {
            className: 'content3-content',
            children: featuresSection.feature2.content
          }
        }
      },
      {
        name: 'block2',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png'
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: featuresSection.feature3.title },
          content: {
            className: 'content3-content',
            children: featuresSection.feature3.content
          }
        }
      },
      {
        name: 'block3',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png'
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: featuresSection.feature4.title },
          content: {
            className: 'content3-content',
            children: featuresSection.feature4.content
          }
        }
      },
      {
        name: 'block4',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png'
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: featuresSection.feature5.title },
          content: {
            className: 'content3-content',
            children: featuresSection.feature5.content
          }
        }
      },
      {
        name: 'block5',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png'
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: featuresSection.feature6.title },
          content: {
            className: 'content3-content',
            children: featuresSection.feature6.content
          }
        }
      }
    ]
  }
};

export const Content90DataSource = {
  id: ROADMAP_LINK,
  wrapper: { className: 'home-page-wrapper content9-wrapper' },
  page: { className: 'home-page content9' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'image',
        children:
          'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
        className: 'title-image'
      },
      { name: 'title', children: roadmapSection.title, className: 'title-h1' }
    ]
  },
  block: {
    className: 'timeline',
    children: [
      {
        name: 'block0',
        className: 'block-wrapper',
        playScale: 0.3,
        children: {
          imgWrapper: { className: 'image-wrapper' },
          textWrapper: { className: 'text-wrapper' },
          img: {
            className: 'block-img',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png'
          },
          icon: {
            className: 'block-icon',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/qJnGrvjXPxdKETlVSrbe.svg'
          },
          name: { className: 'block-name', children: roadmapSection.step1.name },
          post: { className: 'block-post', children: roadmapSection.step1.post },
          time: { className: 'block-time', children: roadmapSection.step1.time },
          title: { className: 'block-title', children: roadmapSection.step1.title },
          content: { className: 'block-content', children: roadmapSection.step1.content }
        }
      },
      {
        name: 'block1',
        className: 'block-wrapper',
        playScale: 0.3,
        children: {
          imgWrapper: { className: 'image-wrapper' },
          textWrapper: { className: 'text-wrapper' },
          img: {
            className: 'block-img',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png'
          },
          icon: {
            className: 'block-icon',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/QviGtUPvTFxdhsTUAacr.svg'
          },
          name: { className: 'block-name', children: roadmapSection.step2.name },
          post: { className: 'block-post', children: roadmapSection.step2.post },
          time: { className: 'block-time', children: roadmapSection.step2.time },
          title: { className: 'block-title', children: roadmapSection.step2.title },
          content: { className: 'block-content', children: roadmapSection.step2.content }
        }
      },
      {
        name: 'block2',
        className: 'block-wrapper',
        playScale: 0.3,
        children: {
          imgWrapper: { className: 'image-wrapper' },
          textWrapper: { className: 'text-wrapper' },
          img: {
            className: 'block-img',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png'
          },
          icon: {
            className: 'block-icon',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/QviGtUPvTFxdhsTUAacr.svg'
          },
          name: { className: 'block-name', children: roadmapSection.step3.name },
          post: { className: 'block-post', children: roadmapSection.step3.post },
          time: { className: 'block-time', children: roadmapSection.step3.time },
          title: { className: 'block-title', children: roadmapSection.step3.title },
          content: { className: 'block-content', children: roadmapSection.step3.content }
        }
      },
      {
        name: 'block3',
        className: 'block-wrapper',
        playScale: 0.3,
        children: {
          imgWrapper: { className: 'image-wrapper' },
          textWrapper: { className: 'text-wrapper' },
          img: {
            className: 'block-img',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png'
          },
          icon: {
            className: 'block-icon',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/agOOBdKEIJlQhfeYhHJc.svg'
          },
          name: { className: 'block-name', children: roadmapSection.step4.name },
          post: { className: 'block-post', children: roadmapSection.step4.post },
          time: { className: 'block-time', children: roadmapSection.step4.time },
          title: { className: 'block-title', children: roadmapSection.step4.title },
          content: { className: 'block-content', children: roadmapSection.step4.content }
        }
      }
    ]
  }
};

export const Teams40DataSource = {
  id: OUR_TEAM_LINK,
  wrapper: { className: 'home-page-wrapper content8-wrapper' },
  page: { className: 'home-page content8' },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'image',
        children:
          'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
        className: 'title-image'
      },
      { name: 'title', children: 'Our Team', className: 'title-h1' }
    ]
  },
  block: {
    className: 'content-wrapper',
    children: [
      {
        name: 'block0',
        md: 6,
        xs: 24,
        className: 'content8-block-wrapper',
        children: {
          className: 'content8-block',
          link: 'https://www.linkedin.com/in/alina-glumova-67b0b292/',
          img: {
            className: 'content8-img',
            children: photo_alina
          },
          title: { className: 'content8-title', children: 'Alina Glumova' },
          content: {
            className: 'content8-content',
            children: 'Solution Architect'
          }
        }
      },
      {
        name: 'block1',
        md: 6,
        xs: 24,
        className: 'content8-block-wrapper',
        children: {
          className: 'content8-block',
          link: 'https://www.linkedin.com/in/anton-bachikin/',
          img: {
            className: 'content8-img',
            children: photo_anton
          },
          title: { className: 'content8-title', children: 'Anton Bachykin' },
          content: {
            className: 'content8-content',
            children: 'Software Engineer & UI/UX Designer'
          }
        }
      },
      {
        name: 'block2',
        md: 6,
        xs: 24,
        className: 'content8-block-wrapper',
        children: {
          className: 'content8-block',
          link: 'https://www.linkedin.com/in/nikita-gurets-71a039197/',
          img: {
            className: 'content8-img',
            children: photo_nikita
          },
          title: { className: 'content8-title', children: 'Nikita Gurets' },
          content: {
            className: 'content8-content',
            children: 'Software Engineer & AI Coach'
          }
        }
      },
      {
        name: 'block3',
        md: 6,
        xs: 24,
        className: 'content8-block-wrapper',
        children: {
          className: 'content8-block',
          link: 'https://www.linkedin.com/in/andrey-kozel-255a33156/',
          img: {
            className: 'content8-img',
            children: photo_andrey
          },
          title: { className: 'content8-title', children: 'Andrey Kozel' },
          content: {
            className: 'content8-content',
            children: 'Principal Software Engineer & Infrastructure Engineer'
          }
        }
      },
      {
        name: 'block4',
        md: 6,
        xs: 24,
        className: 'content8-block-wrapper',
        children: {
          className: 'content8-block',
          link: 'https://www.linkedin.com/in/ruslan-zianevich-57ab2940/',
          img: {
            className: 'content8-img',
            children: photo_ruslan
          },
          title: { className: 'content8-title', children: 'Ruslan Zianevich' },
          content: {
            className: 'content8-content',
            children: 'Principal Software Engineer'
          }
        }
      },
      {
        name: 'block5',
        md: 6,
        xs: 24,
        className: 'content8-block-wrapper',
        children: {
          className: 'content8-block',
          link: 'https://www.linkedin.com/in/maksim-melnikau-2a3a58141/',
          img: {
            className: 'content8-img',
            children: photo_maksim
          },
          title: { className: 'content8-title', children: 'Maksim Melnikau' },
          content: {
            className: 'content8-content',
            children: 'Delivery Manager'
          }
        }
      },
      {
        name: 'block6',
        md: 6,
        xs: 24,
        className: 'content8-block-wrapper',
        children: {
          className: 'content8-block',
          link: 'https://www.linkedin.com/in/evgenij-uelsky-137b69136/',
          img: {
            className: 'content8-img',
            children: photo_evgenij
          },
          title: { className: 'content8-title', children: 'Evgenij Uelsky' },
          content: {
            className: 'content8-content',
            children: 'CEO'
          }
        }
      }
    ]
  }
};

export const Footer20DataSource = {
  wrapper: { className: 'home-page-wrapper footer2-wrapper' },
  OverPack: { className: 'home-page footer2', playScale: 0.05 },
  copyright: {
    className: 'copyright',
    children: [
      {
        name: 'image',
        children: 'https://user-images.githubusercontent.com/80608392/111055454-9b65a980-843b-11eb-80b7-4ef9d73143a4.png',
        className: 'copyright-logo'
      },
      {
        name: 'group',
        children: 'Kaseya',
        className: 'copyright-group'
      },
      {
        name: 'image2',
        children:
          'https://gw.alipayobjects.com/zos/rmsportal/fgGmQUfiUfSBfvsQpfOj.svg',
        className: 'copyright-line'
      },
      {
        name: 'copyright',
        children: 'Copyright © 2023 Spanning Cloud Apps.  All rights reserved.',
        className: 'copyright-text'
      }
    ]
  },
  links: {
    className: 'links',
    children: [
      {
        name: 'GitHub',
        href: 'https://github.com/SpanningCloudApps/hackathon-ai',
        className: 'links-weibo',
        children: github
      }
    ]
  }
};
