(this.webpackJsonpacres=this.webpackJsonpacres||[]).push([[59],{43:function(e,t,s){"use strict";s.d(t,"b",(function(){return c})),s.d(t,"a",(function(){return a})),s.d(t,"h",(function(){return r})),s.d(t,"j",(function(){return l})),s.d(t,"g",(function(){return o})),s.d(t,"d",(function(){return d})),s.d(t,"i",(function(){return j})),s.d(t,"e",(function(){return u})),s.d(t,"f",(function(){return b})),s.d(t,"c",(function(){return m}));var i=s(56),n=(s(83),s(67)),c=(s(71),"realestate-react.netlify.app"===window.location.host?"http://neprealestate.com:5254":"http://localhost:5254"),a=Object(i.a)({Login:"/users/login",Register:"/users/register",updateProfile:"/users/updateProfile",verifyOtp:"/users/verifyOtp",resendOtp:"/users/resendOtp",changePassword:"/users/changePassword",getStates:"/users/getStates",contactUs:"/users/contact_us",forgotPassword:"/users/forgotPassword",ResetPassword:"/users/resetPassword",getCities:"/users/getCities?id=",getProfileDetails:"/users/getProfileDetails",getPropertyTypes:"/users/getPropertyTypes?id=",addSubscriber:"/users/addSubscriber",propertyEnquiry:"/users/properties_enquiry",isAuthenticated:"/isAuthenticated",getRecentNews:"/news/getRecentNews",getNews:"/news/getNews",getNewsDetails:"/news/getNewsDetails?id=",getPropertyDetails:"/property/getPropertyDetails?id=",getRecentProperties:"/property/getRecentProperties",getPropertiesBySellerID:"/property/getPropertiesBySellerID",getProperties:"/property/getProperties",addProperty:"/property/addProperty",getPropertiesWithFilters:"/property/getPropertiesWithFilters",editProperty:"/property/editProperty",getPropertyCounts:"/property/getPropertyCounts?id=",getSubCategories:"/admin/getSubCategories",getUserById:"/admin/getUserById?id=",getCategories:"/admin/getCategories",getfeatures:"/admin/getfeatures?type=",agentList:"/admin/agentList",editSettings:"/admin/edit-settings",getSettingBySlug:"/admin/get-settings-by-slug",getDistricts:"/admin/getDistricts",getAreaAddresses:"/admin/getAreaAddresses",getCitiesAdmin:"/admin/getCities"},"getAreaAddresses","/admin/getAreaAddresses"),r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i="https://mail.google.com/mail/?view=cm&fs=1&to=".concat(e,"&su=").concat(t,"&body=").concat(s);return i},l=function(e){return e&&e[0].toUpperCase()+e.slice(1)},o=function(e){return e&&e[0].toLowerCase()+e.slice(1)},d=function(e){return e.toLowerCase().replace(/ /g,"-").replace(/[^\w-]+/g,"")},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"\u2705 Success!";n.b.success(e,{position:"top-center",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"\u274c Error";n.b.error(e,{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})},b=function(){return JSON.parse(localStorage.getItem("token"))},m=function(e){for(var t in e)null!==e[t]&&void 0!==e[t]&&""!==e[t]||delete e[t];return e}},44:function(e,t,s){"use strict";var i=s(38),n=s(39),c=s(41),a=s(40),r=s(1),l=s(0),o=s(8),d=function(e){Object(c.a)(s,e);var t=Object(a.a)(s);function s(){return Object(i.a)(this,s),t.apply(this,arguments)}return Object(n.a)(s,[{key:"render",value:function(){return Object(r.jsxs)(l.Fragment,{children:[Object(r.jsx)(o.b,{className:"navbar-brand",to:"/home",style:{width:105},children:Object(r.jsx)("img",{src:"/assets/img/realestaelogo/logo.png",alt:"logo"})}),Object(r.jsxs)("ul",{className:"navbar-nav",children:[Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{exact:!0,to:"/buy",children:"Buy"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{exact:!0,to:"/rent",children:"Rent"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{className:"nav-link",exact:!0,to:"/share",children:"Share"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{className:"nav-link",exact:!0,to:"/sold",children:"Sold"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{exact:!0,to:"/commercial",children:"Commercial"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{exact:!0,to:"/consultants",children:"Property Consultant"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{exact:!0,to:"/about",children:"About Us"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{exact:!0,to:"/news",children:"News"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{exact:!0,to:"/contact",children:"Contact Us"})})]})]})}}]),s}(l.Component);t.a=d},45:function(e,t,s){"use strict";var i=s(38),n=s(39),c=s(41),a=s(40),r=s(1),l=s(0),o=s(8),d=s(47),j=function(e){Object(c.a)(s,e);var t=Object(a.a)(s);function s(){var e;Object(i.a)(this,s);for(var n=arguments.length,c=new Array(n),a=0;a<n;a++)c[a]=arguments[a];return(e=t.call.apply(t,[this].concat(c))).getNextSibling=function(e,t){var s=e.nextElementSibling;if(!t)return s;for(;s;){if(s.matches(t))return s;s=s.nextElementSibling}},e.triggerChild=function(t){var s="";null!==(s=void 0!==e.getNextSibling(t.target,".submenu")?e.getNextSibling(t.target,".submenu"):null)&&void 0!==s&&""!==s&&(s.classList=s.classList.contains("d-block")?"submenu":"submenu d-block")},e}return Object(n.a)(s,[{key:"render",value:function(){var e=this;return Object(r.jsx)("div",{className:"aside-scroll",children:Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{className:"menu-section-title",children:"Pages"}),d.length>0?d.map((function(t,s){return Object(r.jsxs)("li",{className:"menu-item ".concat(t.child?"menu-item-has-children":""," "),onClick:e.triggerChild,children:[t.child?Object(r.jsxs)(o.b,{onClick:function(e){return e.preventDefault()},to:"/",children:[" ",Object(r.jsx)("i",{className:"flaticon-"+t.icon})," ",t.linkText," "]}):Object(r.jsxs)(o.b,{to:t.link,children:[" ",Object(r.jsx)("i",{className:"flaticon-"+t.icon})," ",t.linkText," "]}),t.child?Object(r.jsx)("ul",{className:"submenu",role:"menu",children:t.submenu.map((function(e,t){return Object(r.jsxs)("li",{className:"menu-item ".concat(e.child?"menu-item-has-children":""," "),children:[e.child?Object(r.jsxs)(o.b,{onClick:function(e){return e.preventDefault()},to:"/",children:[" ",e.linkText," "]}):Object(r.jsxs)(o.b,{to:e.link,children:[" ",e.linkText," "]}),e.submenu?Object(r.jsx)("ul",{className:"submenu",children:e.submenu.map((function(e,t){return Object(r.jsx)("li",{className:"menu-item",children:Object(r.jsx)(o.b,{to:e.link,children:e.linkText})},t)}))}):null]},t)}))}):null]},s)})):null,Object(r.jsx)("li",{className:"menu-section-title",children:"Get Social"}),Object(r.jsxs)("li",{className:"menu-item",children:[" ",Object(r.jsxs)(o.b,{to:"#",children:[" ",Object(r.jsx)("i",{className:"flaticon-facebook"}),"Facebook"]})," "]}),Object(r.jsxs)("li",{className:"menu-item",children:[" ",Object(r.jsxs)(o.b,{to:"#",children:[" ",Object(r.jsx)("i",{className:"flaticon-linkedin"})," Linkedin "]})," "]}),Object(r.jsxs)("li",{className:"menu-item",children:[" ",Object(r.jsxs)(o.b,{to:"#",children:[" ",Object(r.jsx)("i",{className:"flaticon-twitter"})," Twitter "]})," "]}),Object(r.jsxs)("li",{className:"menu-item",children:[" ",Object(r.jsxs)(o.b,{to:"#",children:[" ",Object(r.jsx)("i",{className:"flaticon-instagram"})," Instagram "]})," "]})]})})}}]),s}(l.Component);t.a=j},46:function(e,t,s){"use strict";var i=s(38),n=s(39),c=s(48),a=s(41),r=s(40),l=s(1),o=s(0),d=function(e){Object(a.a)(s,e);var t=Object(r.a)(s);function s(e){var n;return Object(i.a)(this,s),(n=t.call(this,e)).state={navtoggle:!1},n.navtoggleClass=n.navtoggleClass.bind(Object(c.a)(n)),n}return Object(n.a)(s,[{key:"navtoggleClass",value:function(){this.setState({navtoggle:!this.state.navtoggle})}},{key:"componentDidMount",value:function(){var e=this;window.addEventListener("scroll",(function(){e.setState({isTop:window.scrollY>100})}),!1)}},{key:"render",value:function(){return Object(l.jsx)(o.Fragment,{})}}]),s}(o.Component);t.a=d},47:function(e){e.exports=JSON.parse('[{"id":1,"linkText":"Buy","child":false,"icon":"house","link":"/home"},{"id":2,"linkText":"Rent","child":false,"icon":"home","link":"/rent"},{"id":3,"linkText":"Sold","child":false,"icon":"sold","link":"/sold"},{"id":3,"linkText":"Share","child":false,"icon":"apartment","link":"/share"},{"id":4,"linkText":"Commercial","child":false,"icon":"company","link":"/commercial"},{"id":5,"linkText":"Property Consaltant","child":false,"icon":"headset","link":"/consultants"},{"id":4,"linkText":"About us","child":false,"icon":"house","link":"/about"},{"id":4,"linkText":"News","child":false,"icon":"blog","link":"/news"},{"id":4,"linkText":"Contact us","child":false,"icon":"location","link":"/contact"}]')},50:function(e,t,s){"use strict";t.a=function(){return null!==localStorage.getItem("token")}},536:function(e,t,s){"use strict";s.r(t);var i=s(1),n=s(0),c=s(51),a=s.n(c),r=s(93),l=s(70),o=s(53),d=s(2),j=s(8),u=s(120),b=s.n(u),m=s(62),h=s.n(m),g=(s(71),s(67)),O=s(43),x=[{img:"assets/img/coming-soon/1.jpg",title:"Quote of the day",text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"},{img:"assets/img/coming-soon/2.jpg",title:"Quote of the day",text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"},{img:"assets/img/coming-soon/3.jpg",title:"Quote of the day",text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}],p={slidesToShow:1,slidesToScroll:1,arrows:!1,autoplay:!0,dots:!0,dotsClass:"d-flex slick-dots"},f=function(e){var t=e.userData,s=Object(d.g)(),c=Object(n.useState)(""),a=Object(o.a)(c,2),r=a[0],u=a[1],m=Object(n.useState)(""),f=Object(o.a)(m,2),v=(f[0],f[1],Object(n.useState)("")),y=Object(o.a)(v,2),N=y[0],k=y[1],C=Object(n.useState)(""),P=Object(o.a)(C,2),S=(P[0],P[1]),w=Object(n.useState)(!1),T=Object(o.a)(w,2),L=(T[0],T[1]),D=Object(n.useState)(!1),A=Object(o.a)(D,2),I=A[0],F=A[1],B=Object(n.useState)(!1),R=Object(o.a)(B,2),E=R[0],U=R[1];return Object(i.jsxs)("div",{className:"acr-auth-container",children:[Object(i.jsx)("div",{className:"acr-auth-content",children:Object(i.jsxs)("form",{method:"post",onSubmit:function(e){if(F(!0),e.preventDefault(),k(""),S(""),function(){if(""===r)k("Please enter a valid email OTP!");else{if(!(r.length<4||""===r))return!0;k("Please enter valid email OTP of 4 digit.")}}()){var i=O.b+O.a.verifyOtp;h.a.post(i,{email:t.email,email_otp:r,type:"seller"}).then((function(e){F(!1),!0===e.data.error?(Object(O.e)(e.data.title),L(!1)):(Object(O.i)(e.data.title),setTimeout((function(){s.push("/login")}),2e3))})).catch((function(){F(!1)}))}else F(!1)},children:[Object(i.jsx)("div",{className:"auth-text",children:Object(i.jsxs)("h3",{children:[Object(i.jsx)("span",{style:{color:"#004592"},children:"Nep "}),Object(i.jsx)("span",{style:{color:"#F42F2F"},children:"Real Estate"})," Verification Area"," "]})}),Object(i.jsxs)("div",{className:"form-group",children:[Object(i.jsx)("label",{children:"Enter email OTP"}),Object(i.jsx)("input",{type:"number",onChange:function(e){return u(e.target.value)},className:"form-control form-control-light",placeholder:"Email OTP",name:"email"}),Object(i.jsx)("p",{style:{color:"red",fontSize:"14px"},children:N})]}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsxs)(j.b,{to:"#",className:"forgot-password",onClick:function(e){U(!0),e.preventDefault(),console.log();var s=O.b+O.a.resendOtp;if("mailOTP"===e.target.name)var i={email:t.email};else i={mobile:t.mobile};h.a.post(s,i).then((function(e){U(!1),!0===e.data.error?Object(O.e)(e.data.title):Object(O.i)(e.data.title)})).catch((function(){U(!1)}))},name:"mailOTP",children:["Didn't received? mail again",!0===E?Object(i.jsx)("div",{className:"ml-1 spinner-border spinner-border-sm",role:"status",children:Object(i.jsx)("span",{className:"sr-only",children:"Loading..."})}):""]})}),Object(i.jsx)(g.a,{}),Object(i.jsxs)("button",{type:"submit",className:"btn-custom secondary btn-block",disabled:I,children:["Submit",!0===I?Object(i.jsx)("div",{className:"ml-1 spinner-border spinner-border-sm",role:"status",children:Object(i.jsx)("span",{className:"sr-only",children:"Loading..."})}):""]})]})}),Object(i.jsx)("div",{className:"acr-auth-bg",children:Object(i.jsx)(b.a,Object(l.a)(Object(l.a)({className:"acr-auth-bg-slider acr-cs-bg-slider"},p),{},{children:x&&x.map((function(e,t){return Object(i.jsx)("div",{children:Object(i.jsx)("div",{className:"acr-cs-bg-item bg-cover bg-center",style:{backgroundImage:"url(/"+e.img+")"},children:Object(i.jsxs)("div",{className:"acr-auth-quote",children:[Object(i.jsx)("h6",{children:e.title}),Object(i.jsx)("p",{children:e.text})]})})},t)}))}))})]})};t.default=function(e){var t=e.location,s={email:t.state.email,mobile:t.state.mobile};return Object(i.jsxs)(n.Fragment,{children:[Object(i.jsxs)(a.a,{children:[Object(i.jsx)("title",{children:"Verification | Neprealestate"}),Object(i.jsx)("meta",{name:"description",content:"#"})]}),Object(i.jsx)(r.a,{}),Object(i.jsx)(f,{userData:s})," "]})}},93:function(e,t,s){"use strict";var i=s(38),n=s(39),c=s(41),a=s(40),r=s(1),l=s(0),o=s(44),d=s(45),j=s(46),u=s(8),b=s(42),m=s.n(b),h=s(50),g=function(e){Object(c.a)(s,e);var t=Object(a.a)(s);function s(){return Object(i.a)(this,s),t.apply(this,arguments)}return Object(n.a)(s,[{key:"render",value:function(){return Object(r.jsxs)(l.Fragment,{children:[Object(r.jsxs)("aside",{className:m()("main-aside",{open:this.state.navtoggle}),children:[Object(r.jsx)("div",{className:"aside-title",children:Object(r.jsxs)("div",{className:"aside-controls aside-trigger",children:[Object(r.jsx)("h4",{children:"Menu"}),Object(r.jsxs)("div",{className:"close-btn close-dark",onClick:this.navtoggleClass,children:[Object(r.jsx)("span",{}),Object(r.jsx)("span",{})]})]})}),Object(r.jsx)(d.a,{})]}),Object(r.jsx)("div",{className:"aside-overlay aside-trigger",onClick:this.navtoggleClass}),Object(r.jsxs)("header",{className:"main-header header-fw",children:[Object(r.jsx)("div",{className:"top-header",children:Object(r.jsxs)("div",{className:"top-header-inner",children:[Object(r.jsxs)("ul",{className:"social-media",children:[Object(r.jsxs)("li",{children:[" ",Object(r.jsxs)(u.b,{to:"#",children:[" ",Object(r.jsx)("i",{className:"fab fa-facebook-f"})," "]})," "]}),Object(r.jsxs)("li",{children:[" ",Object(r.jsxs)(u.b,{to:"#",children:[" ",Object(r.jsx)("i",{className:"fab fa-pinterest-p"})," "]})," "]}),Object(r.jsxs)("li",{children:[" ",Object(r.jsxs)(u.b,{to:"#",children:[" ",Object(r.jsx)("i",{className:"fab fa-linkedin-in"})," "]})," "]}),Object(r.jsxs)("li",{children:[" ",Object(r.jsxs)(u.b,{to:"#",children:[" ",Object(r.jsx)("i",{className:"fab fa-twitter"})," "]})," "]})]}),Object(r.jsx)("ul",{className:"top-header-nav",children:Object(h.a)()?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("li",{children:[" ",Object(r.jsx)(u.b,{to:"/profile",children:" Profile"})," "]}),Object(r.jsxs)("li",{children:[" ",Object(r.jsx)(u.b,{to:"/logout",children:" Logout"})," "]})]}):Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("li",{children:[" ",Object(r.jsx)(u.b,{to:"/login",children:" Login"})," "]}),Object(r.jsx)("li",{children:"or"}),Object(r.jsxs)("li",{children:[" ",Object(r.jsx)(u.b,{to:"/register",children:" Signup"})," "]})]})})]})}),Object(r.jsxs)("nav",{className:"navbar",children:[Object(r.jsx)(o.a,{}),Object(r.jsxs)("div",{className:"header-controls",children:[Object(h.a)()&&Object(r.jsx)("ul",{className:"header-controls-inner d-none d-lg-flex",children:Object(r.jsx)("li",{children:Object(r.jsxs)(u.b,{to:"/add-property",className:"btn-custom primary",children:["Add Property ",Object(r.jsx)("i",{className:"fas fa-plus"})," "]})})}),Object(r.jsxs)("div",{className:"aside-toggler aside-trigger",onClick:this.navtoggleClass,children:[Object(r.jsx)("span",{}),Object(r.jsx)("span",{}),Object(r.jsx)("span",{})]})]})]})]})]})}}]),s}(j.a);t.a=g}}]);
//# sourceMappingURL=59.77c3f8f0.chunk.js.map