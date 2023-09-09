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
  imageLink: '',
  content: '',
  subTitle: '',
  buttonText: '',
  buttonLink: ''
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
  button: { className: 'banner0-button', children: 'Connect' }
};

export const Pricing00DataSource = {
  id: PRODUCT_LINK,
  wrapper: { className: 'home-page-wrapper pricing0-wrapper' },
  OverPack: { playScale: 0.3, className: 'home-page pricing0' },
  imgWrapper: { className: 'pricing0-img-wrapper', md: 12, xs: 24 },
  img: {
    className: 'pricing0-img',
    name: 'image',
    children:
      'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*OnyWT4Nsxy0AAAAAAAAAAABjARQnAQ'
  },
  childWrapper: {
    className: 'pricing0-text-wrapper',
    md: 12,
    xs: 24,
    children: [
      {
        name: 'title',
        children: '',
        className: 'pricing0-title'
      },
      {
        name: 'content',
        children:
          '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。按金融企业安全要求打造的完整云上安全体系，全方位保障金融应用及数据安全。<br/>500-5Gbps，10 GB-50TB（含），1TB流量包，国内按峰值。',
        className: 'pricing0-content'
      },
      { name: 'pricing', children: '¥2,200', className: 'pricing0-pricing' },
      {
        name: 'button',
        children: {
          href: '#',
          type: 'primary',
          children: '立即购买'
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
    children:
      'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*OnyWT4Nsxy0AAAAAAAAAAABjARQnAQ'
  },
  childWrapper: {
    className: 'pricing0-text-wrapper',
    md: 12,
    xs: 24,
    children: [
      {
        name: 'title',
        children: 'OceanBase 服务器',
        className: 'pricing0-title'
      },
      {
        name: 'content',
        children:
          '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。按金融企业安全要求打造的完整云上安全体系，全方位保障金融应用及数据安全。<br/>500-5Gbps，10 GB-50TB（含），1TB流量包，国内按峰值。',
        className: 'pricing0-content'
      },
      { name: 'pricing', children: '¥2,200', className: 'pricing0-pricing' },
      {
        name: 'button',
        children: {
          icon: 'shopping-cart',
          href: '#',
          type: 'primary',
          children: '立即购买'
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
        children: '蚂蚁金融云提供专业的服务',
        className: 'title-h1'
      },
      {
        name: 'content',
        className: 'title-content content4-title-content',
        children: '科技想象力，金融创造力'
      }
    ]
  },
  video: {
    className: 'content4-video',
    children: {
      video: 'https://os.alipayobjects.com/rmsportal/EejaUGsyExkXyXr.mp4',
      image: 'https://zos.alipayobjects.com/rmsportal/HZgzhugQZkqUwBVeNyfz.jpg'
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
      { name: 'title', children: '丰富的特色展台', className: 'title-h1' },
      {
        name: 'content',
        children:
          '特色展台包括 Ant Design 、AntV、AntG、Egg 等明星产品，更有产品专家',
        className: 'title-content'
      },
      {
        name: 'content2',
        children: '现场问诊，为你答疑解难',
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
        children: '蚂蚁金融云提供专业的服务',
        className: 'title-h1'
      },
      {
        name: 'content',
        className: 'title-content',
        children: '基于阿里云强大的基础资源'
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
          title: { className: 'content3-title', children: '企业资源管理' },
          content: {
            className: 'content3-content',
            children:
              '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。'
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
          title: { className: 'content3-title', children: '云安全' },
          content: {
            className: 'content3-content',
            children:
              '按金融企业安全要求打造的完整云上安全体系，全方位保障金融应用及数据安全。'
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
          title: { className: 'content3-title', children: '云监控' },
          content: {
            className: 'content3-content',
            children:
              '分布式云环境集中监控，统一资源及应用状态视图，智能分析及故障定位。'
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
          title: { className: 'content3-title', children: '移动' },
          content: {
            className: 'content3-content',
            children:
              '一站式移动金融APP开发及全面监控；丰富可用组件，动态发布和故障热修复。'
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
          title: { className: 'content3-title', children: '分布式中间件' },
          content: {
            className: 'content3-content',
            children:
              '金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。'
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
          title: { className: 'content3-title', children: '大数据' },
          content: {
            className: 'content3-content',
            children:
              '一站式、全周期大数据协同工作平台，PB级数据处理、毫秒级数据分析工具。'
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
      { name: 'title', children: '会议日程', className: 'title-h1' }
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
          name: { className: 'block-name', children: '姓名' },
          post: { className: 'block-post', children: '公司 职位' },
          time: { className: 'block-time', children: '09:00 - 10:00' },
          title: { className: 'block-title', children: '开幕致辞' },
          content: { className: 'block-content', children: '' }
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
          name: { className: 'block-name', children: '姓名' },
          post: { className: 'block-post', children: '公司 职位' },
          time: { className: 'block-time', children: '09:00 - 10:00' },
          title: { className: 'block-title', children: '演示标题 - XYZ' },
          content: {
            className: 'block-content',
            children:
              '经过近 3 年的打磨，在助力中台产品研发效能提升的目标之上，包含设计语言、UI 资产、可视化以及产品体验相关的蚂蚁中台设计体系正在逐步成型。此次分享包含两部分，在介绍蚂蚁设计体系的同时，也会和大家分享我们在设计语言的部分探索。'
          }
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
          name: { className: 'block-name', children: '姓名' },
          post: { className: 'block-post', children: '公司 职位' },
          time: { className: 'block-time', children: '09:00 - 10:00' },
          title: { className: 'block-title', children: '演示标题 - XYZ' },
          content: {
            className: 'block-content',
            children:
              '经过近 3 年的打磨，在助力中台产品研发效能提升的目标之上，包含设计语言、UI 资产、可视化以及产品体验相关的蚂蚁中台设计体系正在逐步成型。此次分享包含两部分，在介绍蚂蚁设计体系的同时，也会和大家分享我们在设计语言的部分探索。'
          }
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
          name: { className: 'block-name', children: '姓名' },
          post: { className: 'block-post', children: '公司 职位' },
          time: { className: 'block-time', children: '09:00 - 10:00' },
          title: { className: 'block-title', children: '演示标题 - XYZ' },
          content: {
            className: 'block-content',
            children:
              '经过近 3 年的打磨，在助力中台产品研发效能提升的目标之上，包含设计语言、UI 资产、可视化以及产品体验相关的蚂蚁中台设计体系正在逐步成型。此次分享包含两部分，在介绍蚂蚁设计体系的同时，也会和大家分享我们在设计语言的部分探索。'
          }
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
