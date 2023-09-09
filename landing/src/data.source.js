/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

export const Nav00DataSource = {
  wrapper: { className: 'header0 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header0-logo',
    children: 'src/assets/img/flowify.png'
  },
  Menu: {
    className: 'header0-menu',
    children: [
      {
        name: 'item0',
        className: 'header0-item',
        children: {
          href: '#',
          children: [{ children: '导航一', name: 'text' }]
        },
        subItem: [
          {
            name: 'sub0',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'image0',
                  className: 'item-image',
                  children:
                    'https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg'
                },
                {
                  name: 'title',
                  className: 'item-title',
                  children: 'Ant Design'
                },
                {
                  name: 'content',
                  className: 'item-content',
                  children: '企业级 UI 设计体系'
                }
              ]
            }
          },
          {
            name: 'sub1',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'image0',
                  className: 'item-image',
                  children:
                    'https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg'
                },
                {
                  name: 'title',
                  className: 'item-title',
                  children: 'Ant Design'
                },
                {
                  name: 'content',
                  className: 'item-content',
                  children: '企业级 UI 设计体系'
                }
              ]
            }
          }
        ]
      },
      {
        name: 'item1',
        className: 'header0-item',
        children: {
          href: '#',
          children: [{ children: '导航二', name: 'text' }]
        }
      },
      {
        name: 'item2',
        className: 'header0-item',
        children: {
          href: '#',
          children: [{ children: '导航三', name: 'text' }]
        }
      },
      {
        name: 'item3',
        className: 'header0-item',
        children: {
          href: '#',
          children: [{ children: '导航四', name: 'text' }]
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
    children: 'src/assets/img/flowify.png'
  },
  content: {
    className: 'banner0-content',
    children: '一个高效的页面动画解决方案'
  },
  button: { className: 'banner0-button', children: 'Learn More' }
};

export const Pricing00DataSource = {
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
            children: 'src/assets/img/team/alina_g.jpeg'
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
            children: 'src/assets/img/team/anton_b.jpeg'
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
            children: 'src/assets/img/team/nikita_g.jpeg'
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
            children: 'src/assets/img/team/andrey_k.jpeg'
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
            children: 'src/assets/img/team/ruslan_z.jpeg'
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
            children: 'src/assets/img/team/maksim_m.jpeg'
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
            children: 'src/assets/img/team/evgenij_u.jpeg'
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
        children:
          'https://gw.alipayobjects.com/zos/rmsportal/NuuAwJBxewWglRSoNjET.png',
        className: 'copyright-logo'
      },
      {
        name: 'group',
        children: '蚂蚁金服体验科技大会',
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
        children: 'Copyright © 蚂蚁金融服务集团',
        className: 'copyright-text'
      }
    ]
  },
  links: {
    className: 'links',
    children: [
      {
        name: 'weibo',
        href: '#',
        className: 'links-weibo',
        children:
          'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjZweCIgaGVpZ2h0PSIyMXB4IiB2aWV3Qm94PSIwIDAgMjYgMjEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT53ZWlibzwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9IjAuNCI+CiAgICAgICAgPGcgaWQ9IumhteiEmiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTU2LjAwMDAwMCwgLTIxLjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIGlkPSJ3ZWlibyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTYuMDAwMDAwLCAyMS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xOS4wOTMyNDIyLDkuNDM5OTgwNzIgQzE5LjUwNzk3MjcsOC4zOTk3OTc1OSAxOS41NTA5NTksNy41MDI1NjYyNyAxOS4xMDExMzg3LDYuODYyNTcyMjkgQzE4LjI1Nzk5MjIsNS42NjIzNTkwNCAxNS45NTA2Njk5LDUuNzI2OTAyNDEgMTMuMzA1NzI4NSw2LjgzMDMxMzI1IEMxMy4zMDU3Mjg1LDYuODI4OTQ2OTkgMTIuNDc1MzAyNyw3LjE5MjQ3NDcgMTIuNjg3NTkzNyw2LjUzNTc1NjYzIEMxMy4wOTQ0MDIzLDUuMjMyNTY3NDcgMTMuMDMzMjg3MSw0LjE0MTI1MDYgMTIuNDAwMTIxMSwzLjUxMDg5NjM5IEMxMC45NjU0MjM4LDIuMDgwMTEzMjUgNy4xNDk3NzE0OCwzLjU2NTA2NjI3IDMuODc3MjUsNi44MjQ1NDQ1OCBDMS40MjcwMjkzLDkuMjY2NDkwMzYgMC4wMDQwODc4OTA2MiwxMS44NTQ2NzcxIDAuMDA0MDg3ODkwNjIsMTQuMDkyNzcxMSBDMC4wMDQwODc4OTA2MiwxOC4zNzM1ODMxIDUuNTEyOTkwMjMsMjAuOTc1OTYzOSAxMC45MDI1NTY2LDIwLjk3NTk2MzkgQzE3Ljk2NzIxODgsMjAuOTc1OTYzOSAyMi42NjY4OTY1LDE2Ljg4NTU0MzQgMjIuNjY2ODk2NSwxMy42MzgxODQzIEMyMi42NjY4OTY1LDExLjY3NjE3NzEgMjEuMDA4NTU4NiwxMC41NjI3OTc2IDE5LjUxODM1NzQsMTAuMTAyMDYyNyBDMTkuMTUyNjA1NSw5Ljk5MzExNTY2IDE4LjkwMTU2ODQsOS45MTgzNzU5IDE5LjA5MzIxNjgsOS40Mzk5ODA3MiBMMTkuMDkzMjQyMiw5LjQzOTk4MDcyIFogTTIuNjI0NzU1ODYsMTUuMTE0MTMwMSBDMi4zNDU1NjA1NSwxMi4zMDA5Mzk4IDUuNjA2NTI5Myw5LjY3NzI1NTQyIDkuOTA2MzMwMDgsOS4yNTM4MTQ0NiBDMTQuMjA3MDk1Nyw4LjgyOTU4OTE2IDE3LjkxOTQzMzYsMTAuNzY3MDI4OSAxOC4xOTg2MDM1LDEzLjU3OTQwOTYgQzE4LjQ3NzIxNDgsMTYuMzkzNzEzMyAxNS4yMTc2MTcyLDE5LjAxODE4MTkgMTAuOTE2ODI2MiwxOS40NDE4MjUzIEM2LjYxNjY2OTkyLDE5Ljg2NDMwNDggMi45MDQzMDY2NCwxNy45Mjc4NTE4IDIuNjI0NzU1ODYsMTUuMTE0MTMwMSBaIE0xMS4zNDY3OTEsMTEuNDE4OTE0NSBDOS4zMDAzMzIwMywxMC44ODgwNjk5IDYuOTg3MjIwNywxMS45MDQ0NDQ2IDYuMDk4MzcxMDksMTMuNzAxNDEyIEM1LjE5MzE0NDUzLDE1LjUzMzkyNzcgNi4wNjg0ODYzMywxNy41NjgxOTUyIDguMTM1NzkxMDIsMTguMjMzMzM4NiBDMTAuMjc3NjkzNCwxOC45MjEzNTQyIDEyLjgwMTcyNDYsMTcuODY2NzQ5NCAxMy42Nzk3ODMyLDE1Ljg4ODk3OTUgQzE0LjU0NTI5ODgsMTMuOTU1MjA4NCAxMy40NjQ0MTk5LDExLjk2NDE4MDcgMTEuMzQ2NzkxLDExLjQxODkxNDUgWiBNOS43ODM4OTY0OCwxNi4wOTg5Nzk1IEM5LjM2Nzk5ODA1LDE2Ljc2MDEgOC40NzcyNDQxNCwxNy4wNDk4MjQxIDcuODA2MDY4MzYsMTYuNzQ0NzE2OSBDNy4xNDQ5NDcyNywxNi40NDQ5OTg4IDYuOTUwMDIzNDQsMTUuNjc2NSA3LjM2NjA5OTYxLDE1LjAzMTY5ODggQzcuNzc2OTcwNywxNC4zODk4MDcyIDguNjM3NjYyMTEsMTQuMTAzMzQ3IDkuMzAzODEwNTUsMTQuMzgxNzEwOCBDOS45NzcyOTY4NywxNC42Njc4MTY5IDEwLjE5MjY2MDIsMTUuNDMwNzQ5NCA5Ljc4Mzg5NjQ4LDE2LjA5ODk3OTUgWiBNMTEuMTU0MTc3NywxNC4zNDYxODggQzExLjAwMzc4OTEsMTQuNjAyODY4NyAxMC42NzExOTczLDE0LjcyNTgzMjUgMTAuNDEwOTE4LDE0LjYxOTAxMDggQzEwLjE1NDQ3MjcsMTQuNTE0MTEyIDEwLjA3NDI2MzcsMTQuMjI3NDQ5NCAxMC4yMTk4MjgxLDEzLjk3NTM3MzUgQzEwLjM2OTgzNTksMTMuNzI0ODQxIDEwLjY4OTUyOTMsMTMuNjAyNjYxNCAxMC45NDQ5ODQ0LDEzLjcwMzMzNDkgQzExLjIwNDcwNTEsMTMuNzk4MjE0NSAxMS4yOTc4Mzc5LDE0LjA4ODM0MzQgMTEuMTU0MjAzMSwxNC4zNDYxODggTDExLjE1NDE3NzcsMTQuMzQ2MTg4IFogTTI0LjIwOTc4MzIsMi4yNjg0MDQ4MiBDMjUuOTE2ODk2NSw0LjE1MTI2OTg4IDI2LjM3Njc0NjEsNi43MTgxMDI0MSAyNS42NDgzMTQ1LDguOTcwNjE4MDcgQzI1LjY0ODEzNjcsOC45NzE3ODE5MyAyNS42NDgxMzY3LDguOTczNjc5NTIgMjUuNjQ4MTM2Nyw4Ljk3NDQ2Mzg2IEMyNS40Nzg4MzIsOS40OTQzNTMwMSAyNC45MTgxNTYyLDkuNzc5NDcyMjkgMjQuMzk2MDIzNCw5LjYxMDk5MTU3IEMyMy44NzE5NjA5LDkuNDQyNDg1NTQgMjMuNTg1ODU5NCw4Ljg4NDc0NTc4IDIzLjc1NTEzODcsOC4zNjI5MDg0MyBMMjMuNzU0OTM1NSw4LjM2MjMyNjUxIEMyNC4yNzM3OTMsNi43NjE3MjE2OSAyMy45NDQ4NTc0LDQuOTM1MzI4OTIgMjIuNzMzMjY3NiwzLjU5Njc2ODY3IEMyMS41MTk3MjI3LDIuMjU4MjA4NDMgMTkuNzMxNjM4NywxLjc0NjM5MDM2IDE4LjA3OTA2NDUsMi4wOTU4NzU5IEMxNy41NDE3MjI3LDIuMjEwNTY2MjcgMTcuMDEzMDM5MSwxLjg2ODM5Mjc3IDE2Ljg5ODkwODIsMS4zMzM1IEMxNi43ODMzODA5LDAuNzk4ODA5NjM5IDE3LjEyNjQwODIsMC4yNzE2MDg0MzQgMTcuNjYzMzY5MSwwLjE1NzUgTDE3LjY2NDEzMDksMC4xNTc1IEMxOS45ODcyOTY5LC0wLjMzNDU1NzgzMSAyMi41MDQwMTU2LDAuMzgzNjE2ODY3IDI0LjIwOTc4MzIsMi4yNjgzNzk1MiBMMjQuMjA5NzgzMiwyLjI2ODQwNDgyIFogTTIxLjU4OTUyMTUsNC42MjQ0NTMwMSBMMjEuNTg5NTIxNSw0LjYyNDI3NTkgQzIyLjQyMTg3Nyw1LjU0MjI3OTUyIDIyLjY0NDE3MTksNi43OTE4ODA3MiAyMi4yODg0NDkyLDcuODg5NyBDMjIuMTQzMjY1Niw4LjMzODEzODU1IDIxLjY2MDg2OTEsOC41ODI5MDI0MSAyMS4yMTA0NjQ4LDguNDM5MzY4NjcgQzIwLjc2MDQ0MTQsOC4yOTM3MzQ5NCAyMC41MTQ0MzE2LDcuODEyNDU1NDIgMjAuNjU5NDEyMSw3LjM2NDgyNjUxIEwyMC42NTg4MjgxLDcuMzY0ODI2NTEgQzIwLjgzMzcxODgsNi44MjgxODc5NSAyMC43MjQyMDksNi4yMTY0NTU0MiAyMC4zMTc5NTksNS43NjcyNTc4MyBDMTkuOTExNTA1OSw1LjMxOTYwMzYxIDE5LjMxMTcwMzEsNS4xNDk3NTY2MyAxOC43NTg1MTc2LDUuMjY2NTQ2OTkgTDE4Ljc1ODUxNzYsNS4yNjU2MTA4NCBDMTguMjk3MTQ0NSw1LjM2NTkwNDgyIDE3Ljg0MjI5NjksNS4wNzA0MTIwNSAxNy43NDMxOTczLDQuNjExMjIwNDggQzE3LjY0MzkxOTksNC4xNDk3MjY1MSAxNy45Mzg3MDUxLDMuNjk1OTI0MSAxOC40MDE0NDkyLDMuNTk3NzMwMTIgQzE5LjUzMzQxNDEsMy4zNTc5NTA2IDIwLjc1OTI5ODgsMy43MDY4NTQyMiAyMS41ODk1MjE1LDQuNjI0NDUzMDEgTDIxLjU4OTUyMTUsNC42MjQ0NTMwMSBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+'
      },
      {
        name: 'zhihu',
        href: '#',
        className: 'links-zhihu',
        children:
          'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjFweCIgaGVpZ2h0PSIyMXB4IiB2aWV3Qm94PSIwIDAgMjEgMjEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT7nn6XkuY48L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIwLjQiPgogICAgICAgIDxnIGlkPSLpobXohJoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTQuMDAwMDAwLCAtMjEuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPGcgaWQ9IuefpeS5jiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE0LjAwMDAwMCwgMjEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNi43Nzg1ODQ2MSwxMS43MjI5IEwxMS4yOTA5Nzg1LDExLjcyMjkgQzExLjI5MDk3ODUsMTAuNjQ0OSAxMC43OTEyODYyLDEwLjAxMzUgMTAuNzkxMjg2MiwxMC4wMTM1IEw2Ljg3NDM4NzcsMTAuMDEzNSBDNi45Njc0MzM4NSw4LjA2MTE5OTk5IDcuMDUwODMwNzcsNS41NTU4OTk5OSA3LjA4MTE1NjkzLDQuNjI0ODk5OTkgTDEwLjgwNjQ0OTIsNC42MjQ4OTk5OSBDMTAuODA2NDQ5Miw0LjYyNDg5OTk5IDEwLjc4NTc3MjMsMy4wMjQgMTAuMzcyMjMzOCwzLjAyNCBMMy44MjI0NzM4NSwzLjAyNCBDMy44MjI0NzM4NSwzLjAyNCA0LjIxNjcxMzg0LDAuOTMwMyA0Ljc0MTkwNzY5LDAuMDA1NjAwMDA2ODQgQzQuNzQxOTA3NjksMC4wMDU2MDAwMDY4NCAyLjc4NjU1OTk5LC0wLjEwMTQ5OTk5MyAyLjExOTM4NDYyLDIuNTQ2NjAwMDEgQzEuNDUyMjA5MjQsNS4xOTQ3MDAwMSAwLjQ1MjEzNTM5MSw2Ljc5NTYgMC4zNDY2ODMwODQsNy4wODgxOTk5OSBDMC4yNDA1NDE1NTIsNy4zODA3OTk5OSAwLjkyMjE5MDc2OSw3LjIyNjc5OTk5IDEuMjEwMjg5MjIsNy4wODgxOTk5OSBDMS40OTgzODc2OCw2Ljk0OTU5OTk5IDIuODAyNDEyMyw2LjQ3MjIgMy4xODE0ODkyNCw0LjYyNDg5OTk5IEw1LjIwNTc2MDAxLDQuNjI0ODk5OTkgQzUuMjMzMzI5MjMsNS43OTYgNS4zMTMyODAwMSw5LjM4NDE5OTk5IDUuMjg4NDY3NywxMC4wMTM1IEwxLjExOTMxMDc2LDEwLjAxMzUgQzAuNTI3OTUwNzYzLDEwLjQ0NDcgMC4zMzE1MTk5OTMsMTEuNzIyOSAwLjMzMTUxOTk5MywxMS43MjI5IEw1LjA5NjE3MjMxLDExLjcyMjkgQzQuODk2OTg0NjMsMTMuMDU5MiA0LjU0ODIzMzg1LDE0Ljc4MTkgNC4wNjAyNTg0NywxNS42OTQ3IEMzLjI4NzYzMDc3LDE3LjE0MyAyLjg3ODIyNzY5LDE4LjQ2NjcgMC4wODk1OTk5OTMzLDIwLjc0NDUgQzAuMDg5NTk5OTkzMywyMC43NDQ1IC0wLjM2NTI5MjMxNCwyMS4wODMzIDEuMDQ0MTg0NjIsMjAuOTYwMSBDMi40NTQzNTA3NywyMC44MzY5IDMuNzg4MDEyMzEsMjAuNDY3MyA0LjcxMjk1OTk5LDE4LjU4OTIgQzUuMjU1MTIxMjcsMTcuNDY5MTYwNiA1LjcxMTU5MTYsMTYuMzA4Mzk4NyA2LjA3ODMyNjE2LDE1LjExNzIgTDYuMDc2OTQ3NjksMTUuMTIyMSBMMTAuMDAzNDk1NCwxOS43MTM0IEMxMC4wMDM0OTU0LDE5LjcxMzQgMTAuNTE5MDQsMTguNDgxNCAxMC4xMzk5NjMxLDE3LjEyNjkgTDcuMjI5MzQxNTMsMTMuODE1OSBMNi4yNDM3NDE1NSwxNC41NTY1IEw2LjI0MzA1MjMsMTQuNTYgQzYuNTE2Njc2OTEsMTMuNTg1NiA2LjcxMzEwNzY4LDEyLjYyMjQgNi43NzQ0NDkyMiwxMS43ODQ1IEw2Ljc3OTI3Mzg1LDExLjcyMjkgTDYuNzc4NTg0NjEsMTEuNzIyOSBaIE0xMi4yMzEwODkyLDIuNjg1MjAwMDEgTDEyLjIzMTA4OTIsMTguNTczOCBMMTMuODc1NTkzOSwxOC41NzM4IEwxNC41NDk2NjE1LDIwLjQ4NjkgTDE3LjQwMDMyLDE4LjU3MzggTDIwLjk5MzI4LDE4LjU3MzggTDIwLjk5MzI4LDIuNjg1MjAwMDEgTDEyLjIzMTA4OTIsMi42ODUyMDAwMSBaIE0xOS4zMDA1MjkyLDE2Ljg2NTEgTDE3LjQzMjcxMzgsMTYuODY1MSBMMTUuMTAzODAzMSwxOC40Mjc1IEwxNC41NTMxMDc3LDE2Ljg2NTEgTDEzLjk3MjA4NjEsMTYuODY1MSBMMTMuOTcyMDg2MSw0LjQ1ODMgTDE5LjI5OTg0LDQuNDU4MyBMMTkuMjk5ODQsMTYuODY1MSBMMTkuMzAwNTI5MiwxNi44NjUxIFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4='
      }
    ]
  }
};
