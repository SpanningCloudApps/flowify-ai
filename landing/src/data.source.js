/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import flowify from './assets/img/flowify.png';
import github from './assets/img/github.png';
import photo_anton from './assets/img/team/anton_b.jpeg';
import photo_evgenij from './assets/img/team/evgenij_u.jpeg';
import photo_ruslan from './assets/img/team/ruslan_z.jpeg';
import photo_nikita from './assets/img/team/nikita_g.jpeg';
import photo_maksim from './assets/img/team/maksim_m.jpeg';
import photo_alina from './assets/img/team/alina_g.jpeg';
import photo_andrey from './assets/img/team/andrey_k.jpeg';

export const PRODUCT_LINK = 'product';
export const ABOUT_US_LINK = 'about-us';
export const FEATURES_LINK = 'features';
export const ROADMAP_LINK = 'roadmap';
export const OUR_TEAM_LINK = 'our-team';

const product1 = {
  title: 'Client',
  imageLink: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*OnyWT4Nsxy0AAAAAAAAAAABjARQnAQ',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dictum sapien a velit sodales, vitae interdum risus finibus. Morbi feugiat dui nec nisi hendrerit, id finibus diam dictum. Suspendisse potenti. Etiam quis gravida mi.',
  subTitle: 'Generated 5 paragraphs',
  buttonText: 'Let\'s Try',
  buttonLink: '#'
};

const product2 = {
  title: 'Admin',
  imageLink: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*OnyWT4Nsxy0AAAAAAAAAAABjARQnAQ',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dictum sapien a velit sodales, vitae interdum risus finibus. Morbi feugiat dui nec nisi hendrerit, id finibus diam dictum. Suspendisse potenti. Etiam quis gravida mi.',
  subTitle: 'Generated 5 paragraphs',
  buttonText: 'Let\'s Try',
  buttonLink: '#'
};

const demoSection = {
  title: 'Demo',
  subTitle: 'Check 18+ video how xoxol fuck CEO',
  videoLink: 'https://os.alipayobjects.com/rmsportal/EejaUGsyExkXyXr.mp4',
  videoPreview: 'https://zos.alipayobjects.com/rmsportal/HZgzhugQZkqUwBVeNyfz.jpg'
};

const aboutUsSection = {
  title: 'About Us',
  content: 'We super cool team of poooper enginners',
  smallContent: 'We work smart!'
};

const featuresSection = {
  title: 'Features',
  content: 'some text',
  feature1: {
    title: 'Feature 1',
    content: 'Some content of Feature 1'
  },
  feature2: {
    title: 'Feature 2',
    content: 'Some content of Feature 2'
  },
  feature3: {
    title: 'Feature 3',
    content: 'Some content of Feature 3. Some info about this super puper coool features.'
  },
  feature4: {
    title: 'Feature 4',
    content: 'Some content of Feature 4'
  },
  feature5: {
    title: 'Feature 5',
    content: 'Some content of Feature 5. Some info about this super puper coool features.'
  },
  feature6: {
    title: 'Feature 6',
    content: 'Some content of Feature 6. Some info about this super puper coool features.'
  },
};

const roadmapSection = {
  title: 'Roadmap',
  step1: {
    name: 'Step 1',
    post: 'Flowify v1',
    time: '2023 year',
    title: 'Release Some shit',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dictum sapien a velit sodales, vitae interdum risus finibus. Morbi feugiat dui nec nisi hendrerit, id finibus diam dictum. Suspendisse potenti. Etiam quis gravida mi.'
  },
  step2: {
    name: 'Step 2',
    post: 'Flowify v2',
    time: '2024 year',
    title: 'Second Release Some shit',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dictum sapien a velit sodales, vitae interdum risus finibus. Morbi feugiat dui nec nisi hendrerit, id finibus diam dictum. Suspendisse potenti. Etiam quis gravida mi.'
  },
  step3: {
    name: 'Step 3',
    post: '',
    time: '2025 year',
    title: 'Next Release Some shit',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dictum sapien a velit sodales, vitae interdum risus finibus. Morbi feugiat dui nec nisi hendrerit, id finibus diam dictum. Suspendisse potenti. Etiam quis gravida mi.'
  },
  step4: {
    name: 'Step 4',
    post: 'Flowify v4',
    time: '2026 year',
    title: 'Z Release Some shit',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dictum sapien a velit sodales, vitae interdum risus finibus. Morbi feugiat dui nec nisi hendrerit, id finibus diam dictum. Suspendisse potenti. Etiam quis gravida mi.'
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
        name: 'item0',
        className: 'header0-item',
        children: {
          href: `#${PRODUCT_LINK}`,
          children: [{ children: 'Product', name: 'text' }]
        }
      },
      {
        name: 'item1',
        className: 'header0-item',
        children: {
          href: `#${ABOUT_US_LINK}`,
          children: [{ children: 'About Us', name: 'text' }]
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
    children: 'Smart Workflow-Driven Classification System '
  },
  button: {
    className: 'banner0-button',
    children: 'Connect',
    href: `#${PRODUCT_LINK}`
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
  video: {
    className: 'content4-video',
    children: {
      video: demoSection.videoLink,
      image: demoSection.videoPreview
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
