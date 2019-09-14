const data = [
    {
        id: "Dashboards",
        icon: "iconsminds-shop-4",
        label: "داشبورد",
        to: "/app/maindashboards",
        subs: [
            {
                icon: "iconsminds-add",
                label: "منو اصلی",
                to: "/app/maindashboards/showdashboard"
            }
        ]
    },
    {
        id: "Categories",
        icon: "iconsminds-dice",
        label: "دسته بندی",
        to: "/app/dashboards",
        subs: [
            {
                icon: "iconsminds-add",
                label: "اضافه کردن دسته بندی",
                to: "/app/dashboards/addcategories"
            },
            {
                icon: "simple-icon-eye",
                label: "مشاهده دسته بندی",
                to: "/app/dashboards/showcategories"
            },
            // {
            //     icon: "simple-icon-briefcase",
            //     label: "menu.default",
            //     to: "/app/dashboards/default"
            // },
            // {
            //     icon: "simple-icon-pie-chart",
            //     label: "menu.analytics",
            //     to: "/app/dashboards/analytics"
            // },
            // {
            //     icon: "simple-icon-basket-loaded",
            //     label: "menu.ecommerce",
            //     to: "/app/dashboards/ecommerce"
            // },
            // {
            //     icon: "simple-icon-doc",
            //     label: "menu.content",
            //     to: "/app/dashboards/content"
            // }
        ]
    },
    {
        id: "Items",
        icon: "iconsminds-shopping-cart",
        label: "اقلام",
        to: "/app/items",
        subs: [
            {
                icon: "iconsminds-add-cart",
                label: "اضافه کردن اقلام",
                to: "/app/items/additem"
            },
            {
                icon: "iconsminds-checkout",
                label: "مشاهده اقلام",
                to: "/app/items/showitem"
            },


        ]
    },
    {
        id: "Gallery",
        icon: "iconsminds-photo",
        label: "گالری",
        to: "/app/gallery",
        subs: [
            {
                icon: "iconsminds-mail-gallery",
                label: "اضافه کردن گالری",
                to: "/app/gallery/addgallery"
            },
            {
                icon: "iconsminds-preview",
                label: "مشاهده گالری",
                to: "/app/gallery/showgallery"
            },
        ]
    },
    {
        id: "Notification",
        icon: "simple-icon-speech",
        label: "اعلان ها",
        to: "/app/message",
        subs: [
            {
                icon: "iconsminds-mail-add--",
                label: "فرستادن اعلانها",
                to: "/app/Message/sendmessage"
            },
            {
                icon: "iconsminds-mail-photo",
                label: "مشاهده پیام ها  ",
                to: "/app/Message/showmessage"
            },
            {
                icon: "iconsminds-mail-photo",
                label: "مشاهده رخدادها",
                to: "/app/Message/showevents"
            },


        ]
    },
    {
        id: "Comments",
        icon: "iconsminds-friendster",
        label: "نظرات",
        to: "/app/comments",
        subs: [
            {
                icon: "iconsminds-mail-photo",
                label: "مشاهده نظرات",
                to: "/app/comments/showcomments"
            },
            {
                icon: "iconsminds-mail-photo",
                label: "مشاهده نمودار ایتم",
                to: "/app/comments/commentschart"
            },
            {
                icon: "iconsminds-mail-photo",
                label: "مشاهده نمودار دسته بندی",
                to: "/app/comments/categorieschart"
            },

        ]
    },
    {
        id: "Exit",
        icon: "simple-icon-logout",
        label: "خروج",
        to: "/app/exit",
        // subs: [
        //     {
        //         icon: "iconsminds-mail-photo",
        //         label: "مشاهده نظرات",
        //         to: "/app/comments/showcomments"
        //     },
        //     {
        //         icon: "iconsminds-mail-photo",
        //         label: "مشاهده نمودار ایتم",
        //         to: "/app/comments/commentschart"
        //     },
        //     {
        //         icon: "iconsminds-mail-photo",
        //         label: "مشاهده نمودار دسته بندی",
        //         to: "/app/comments/categorieschart"
        //     },
        //
        // ]
    },
  // {
  //   id: "gogo",
  //   icon: "iconsminds-air-balloon-1",
  //   label: "menu.gogo",
  //   to: "/app/gogo",
  //   subs: [
  //     {
  //       icon: "simple-icon-paper-plane",
  //       label: "menu.start",
  //       to: "/app/gogo/start"
  //     }
  //   ]
  // },
  // {
  //   id: "secondmenu",
  //   icon: "iconsminds-three-arrow-fork",
  //   label: "menu.second-menu",
  //   to: "/app/second-menu",
  //   subs: [
  //     {
  //       icon: "simple-icon-paper-plane",
  //       label: "menu.second",
  //       to: "/app/second-menu/second"
  //     }
  //   ]
  // },
  // {
  //   id: "blankpage",
  //   icon: "iconsminds-bucket",
  //   label: "menu.blank-page",
  //   to: "/app/blank-page"
  // },
  // {
  //   id: "docs",
  //   icon: "iconsminds-library",
  //   label: "menu.docs",
  //   to: "https://gogo-react-docs.coloredstrategies.com/",
  //   newWindow:true
  // }
];
export default data;
