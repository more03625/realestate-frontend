(this.webpackJsonpacres=this.webpackJsonpacres||[]).push([[53],{207:function(e){e.exports=JSON.parse('[{"id":1,"icon":"telephone","title":"Reach Out","text":"You can connect with us Via phone. Just click on Call us if you have any quries!","btntext":"Call Us","btnurl":"tel:+0166","targetBlank":"_blank"},{"id":2,"icon":"location","title":"Find Us","text":"Head office: 9-Madhyapur Thimi, Radhe Radhe, Bhaktapur.","btntext":"Get Directions","btnurl":"https://goo.gl/maps/zvfTt2dhJavMC2438","targetBlank":"_blank"},{"id":3,"icon":"speech-bubble","title":"Get Support","text":"Chat with us. ask questions about properties, market trends etc...","btntext":"Start Chat","btnurl":"#","targetBlank":""}]')},43:function(e,t,s){"use strict";s.d(t,"b",(function(){return n})),s.d(t,"a",(function(){return i})),s.d(t,"h",(function(){return a})),s.d(t,"j",(function(){return r})),s.d(t,"g",(function(){return l})),s.d(t,"d",(function(){return o})),s.d(t,"i",(function(){return j})),s.d(t,"e",(function(){return d})),s.d(t,"f",(function(){return b})),s.d(t,"c",(function(){return h}));var c=s(66),n=(s(70),"realestate-react.netlify.app"===window.location.host?"http://neprealestate.com:5254":"http://localhost:5254"),i={Login:"/users/login",Register:"/users/register",updateProfile:"/users/updateProfile",verifyOtp:"/users/verifyOtp",resendOtp:"/users/resendOtp",changePassword:"/users/changePassword",getStates:"/users/getStates",contactUs:"/users/contact_us",forgotPassword:"/users/forgotPassword",ResetPassword:"/users/resetPassword",getCities:"/users/getCities?id=",getProfileDetails:"/users/getProfileDetails",getPropertyTypes:"/users/getPropertyTypes?id=",addSubscriber:"/users/addSubscriber",propertyEnquiry:"/users/properties_enquiry",isAuthenticated:"/isAuthenticated",getRecentNews:"/news/getRecentNews",getNews:"/news/getNews",getNewsDetails:"/news/getNewsDetails?id=",getPropertyDetails:"/property/getPropertyDetails?id=",getRecentProperties:"/property/getRecentProperties",getPropertiesBySellerID:"/property/getPropertiesBySellerID",getProperties:"/property/getProperties",addProperty:"/property/addProperty",getPropertiesWithFilters:"/property/getPropertiesWithFilters",editProperty:"/property/editProperty",getPropertyCounts:"/property/getPropertyCounts?id=",getSubCategories:"/admin/getSubCategories",getUserById:"/admin/getUserById?id=",getCategories:"/admin/getCategories",getfeatures:"/admin/getfeatures?type=",agentList:"/admin/agentList",editSettings:"/admin/edit-settings",getSettingBySlug:"/admin/get-settings-by-slug",getDistricts:"/admin/getDistricts",getAreaAddresses:"/admin/getAreaAddresses",getCitiesAdmin:"/admin/getCities"},a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",c="https://mail.google.com/mail/?view=cm&fs=1&to=".concat(e,"&su=").concat(t,"&body=").concat(s);return c},r=function(e){return e&&e[0].toUpperCase()+e.slice(1)},l=function(e){return e&&e[0].toLowerCase()+e.slice(1)},o=function(e){return e.toLowerCase().replace(/ /g,"-").replace(/[^\w-]+/g,"")},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"\u2705 Success!";c.b.success(e,{position:"top-center",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"\u274c Error";c.b.error(e,{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})},b=function(){return JSON.parse(localStorage.getItem("token"))},h=function(e){for(var t in e)null!==e[t]&&void 0!==e[t]&&""!==e[t]||delete e[t];return e}},44:function(e,t,s){"use strict";var c=s(38),n=s(39),i=s(41),a=s(40),r=s(1),l=s(0),o=s(8),j=function(e){Object(i.a)(s,e);var t=Object(a.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(n.a)(s,[{key:"render",value:function(){return Object(r.jsxs)(l.Fragment,{children:[Object(r.jsx)(o.b,{className:"navbar-brand",to:"/home",style:{width:105},children:Object(r.jsx)("img",{src:"/assets/img/realestaelogo/logo.png",alt:"logo"})}),Object(r.jsxs)("ul",{className:"navbar-nav",children:[Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{exact:!0,to:"/buy",children:"Buy"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{exact:!0,to:"/rent",children:"Rent"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{className:"nav-link",exact:!0,to:"/share",children:"Share"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{className:"nav-link",exact:!0,to:"/sold",children:"Sold"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{exact:!0,to:"/commercial",children:"Commercial"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{exact:!0,to:"/consultants",children:"Property Consultant"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{exact:!0,to:"/about",children:"About Us"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{exact:!0,to:"/news",children:"News"})}),Object(r.jsx)("li",{className:"menu-item menu-item-has-children",children:Object(r.jsx)(o.c,{exact:!0,to:"/contact",children:"Contact Us"})})]})]})}}]),s}(l.Component);t.a=j},45:function(e,t,s){"use strict";var c=s(38),n=s(39),i=s(41),a=s(40),r=s(1),l=s(0),o=s(8),j=s(47),d=function(e){Object(i.a)(s,e);var t=Object(a.a)(s);function s(){var e;Object(c.a)(this,s);for(var n=arguments.length,i=new Array(n),a=0;a<n;a++)i[a]=arguments[a];return(e=t.call.apply(t,[this].concat(i))).getNextSibling=function(e,t){var s=e.nextElementSibling;if(!t)return s;for(;s;){if(s.matches(t))return s;s=s.nextElementSibling}},e.triggerChild=function(t){var s="";null!==(s=void 0!==e.getNextSibling(t.target,".submenu")?e.getNextSibling(t.target,".submenu"):null)&&void 0!==s&&""!==s&&(s.classList=s.classList.contains("d-block")?"submenu":"submenu d-block")},e}return Object(n.a)(s,[{key:"render",value:function(){var e=this;return Object(r.jsx)("div",{className:"aside-scroll",children:Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{className:"menu-section-title",children:"Pages"}),j.length>0?j.map((function(t,s){return Object(r.jsxs)("li",{className:"menu-item ".concat(t.child?"menu-item-has-children":""," "),onClick:e.triggerChild,children:[t.child?Object(r.jsxs)(o.b,{onClick:function(e){return e.preventDefault()},to:"/",children:[" ",Object(r.jsx)("i",{className:"flaticon-"+t.icon})," ",t.linkText," "]}):Object(r.jsxs)(o.b,{to:t.link,children:[" ",Object(r.jsx)("i",{className:"flaticon-"+t.icon})," ",t.linkText," "]}),t.child?Object(r.jsx)("ul",{className:"submenu",role:"menu",children:t.submenu.map((function(e,t){return Object(r.jsxs)("li",{className:"menu-item ".concat(e.child?"menu-item-has-children":""," "),children:[e.child?Object(r.jsxs)(o.b,{onClick:function(e){return e.preventDefault()},to:"/",children:[" ",e.linkText," "]}):Object(r.jsxs)(o.b,{to:e.link,children:[" ",e.linkText," "]}),e.submenu?Object(r.jsx)("ul",{className:"submenu",children:e.submenu.map((function(e,t){return Object(r.jsx)("li",{className:"menu-item",children:Object(r.jsx)(o.b,{to:e.link,children:e.linkText})},t)}))}):null]},t)}))}):null]},s)})):null,Object(r.jsx)("li",{className:"menu-section-title",children:"Get Social"}),Object(r.jsxs)("li",{className:"menu-item",children:[" ",Object(r.jsxs)(o.b,{to:"#",children:[" ",Object(r.jsx)("i",{className:"flaticon-facebook"}),"Facebook"]})," "]}),Object(r.jsxs)("li",{className:"menu-item",children:[" ",Object(r.jsxs)(o.b,{to:"#",children:[" ",Object(r.jsx)("i",{className:"flaticon-linkedin"})," Linkedin "]})," "]}),Object(r.jsxs)("li",{className:"menu-item",children:[" ",Object(r.jsxs)(o.b,{to:"#",children:[" ",Object(r.jsx)("i",{className:"flaticon-twitter"})," Twitter "]})," "]}),Object(r.jsxs)("li",{className:"menu-item",children:[" ",Object(r.jsxs)(o.b,{to:"#",children:[" ",Object(r.jsx)("i",{className:"flaticon-instagram"})," Instagram "]})," "]})]})})}}]),s}(l.Component);t.a=d},46:function(e,t,s){"use strict";var c=s(38),n=s(39),i=s(48),a=s(41),r=s(40),l=s(1),o=s(0),j=function(e){Object(a.a)(s,e);var t=Object(r.a)(s);function s(e){var n;return Object(c.a)(this,s),(n=t.call(this,e)).state={navtoggle:!1},n.navtoggleClass=n.navtoggleClass.bind(Object(i.a)(n)),n}return Object(n.a)(s,[{key:"navtoggleClass",value:function(){this.setState({navtoggle:!this.state.navtoggle})}},{key:"componentDidMount",value:function(){var e=this;window.addEventListener("scroll",(function(){e.setState({isTop:window.scrollY>100})}),!1)}},{key:"render",value:function(){return Object(l.jsx)(o.Fragment,{})}}]),s}(o.Component);t.a=j},47:function(e){e.exports=JSON.parse('[{"id":1,"linkText":"Buy","child":false,"icon":"house","link":"/home"},{"id":2,"linkText":"Rent","child":false,"icon":"home","link":"/rent"},{"id":3,"linkText":"Sold","child":false,"icon":"sold","link":"/sold"},{"id":3,"linkText":"Share","child":false,"icon":"apartment","link":"/share"},{"id":4,"linkText":"Commercial","child":false,"icon":"company","link":"/commercial"},{"id":5,"linkText":"Property Consaltant","child":false,"icon":"headset","link":"/consultants"},{"id":4,"linkText":"About us","child":false,"icon":"house","link":"/about"},{"id":4,"linkText":"News","child":false,"icon":"blog","link":"/news"},{"id":4,"linkText":"Contact us","child":false,"icon":"location","link":"/contact"}]')},50:function(e,t,s){"use strict";t.a=function(){return null!==localStorage.getItem("token")}},519:function(e,t,s){"use strict";s.r(t);var c=s(38),n=s(39),i=s(41),a=s(40),r=s(1),l=s(0),o=s(51),j=s.n(o),d=s(55),b=s(56),h=s(58),u=s(53),m=s(8),O=s(66),x=(s(70),s(43)),g=s(61),p=s.n(g),f=function(){var e=Object(l.useState)(""),t=Object(u.a)(e,2),s=t[0],c=t[1],n=Object(l.useState)(""),i=Object(u.a)(n,2),a=i[0],o=i[1],j=Object(l.useState)(""),d=Object(u.a)(j,2),b=d[0],h=d[1],g=Object(l.useState)(""),f=Object(u.a)(g,2),v=f[0],N=f[1],y=Object(l.useState)(""),k=Object(u.a)(y,2),w=k[0],C=k[1],S=Object(l.useState)(""),P=Object(u.a)(S,2),T=P[0],A=P[1],R=Object(l.useState)(""),D=Object(u.a)(R,2),F=D[0],L=D[1],B=Object(l.useState)(""),U=Object(u.a)(B,2),M=U[0],E=U[1],I=Object(l.useState)(!1),q=Object(u.a)(I,2),z=q[0],_=q[1];return Object(r.jsx)("div",{className:"section pt-0",children:Object(r.jsx)("div",{className:"container",children:Object(r.jsxs)("div",{className:"row",children:[Object(r.jsx)("div",{className:"col-lg-6 mb-lg-30",children:Object(r.jsxs)("div",{className:"acr-locations bg-bottom bg-norepeat",style:{backgroundImage:"url(/assets/img/misc/bldg.png)"},children:[Object(r.jsx)("img",{src:"/assets/img/contact.jpg",alt:""}),Object(r.jsxs)("div",{className:"row",children:[Object(r.jsx)("div",{className:"col-sm-6",children:Object(r.jsxs)("div",{className:"acr-location",children:[Object(r.jsx)("h5",{children:"New York"}),Object(r.jsx)("h5",{children:"USA"}),Object(r.jsxs)("div",{className:"acr-location-address",children:[Object(r.jsx)("p",{children:"Cecilia Chapman 711-2880 Nulla St."}),Object(r.jsx)(m.b,{to:"tel:+123456789",children:"(478) 339 120"})]})]})}),Object(r.jsx)("div",{className:"col-sm-6",children:Object(r.jsxs)("div",{className:"acr-location",children:[Object(r.jsx)("h5",{children:"Tbilsi"}),Object(r.jsx)("h5",{children:"Georgia"}),Object(r.jsxs)("div",{className:"acr-location-address",children:[Object(r.jsx)("p",{children:"Aaron Hawkins 5587 Nunc. Avenue"}),Object(r.jsx)(m.b,{to:"tel:+123456789",children:"(134) 984 438"})]})]})}),Object(r.jsx)("div",{className:"col-sm-6",children:Object(r.jsxs)("div",{className:"acr-location",children:[Object(r.jsx)("h5",{children:"Moscow"}),Object(r.jsx)("h5",{children:"Russia"}),Object(r.jsxs)("div",{className:"acr-location-address",children:[Object(r.jsx)("p",{children:"Lawrence Moreno 935-9940 Tortor. Street"}),Object(r.jsx)(m.b,{to:"tel:+123456789",children:"(443) 893 109"})]})]})}),Object(r.jsx)("div",{className:"col-sm-6",children:Object(r.jsxs)("div",{className:"acr-location",children:[Object(r.jsx)("h5",{children:"Cairo"}),Object(r.jsx)("h5",{children:"Egypt"}),Object(r.jsxs)("div",{className:"acr-location-address",children:[Object(r.jsx)("p",{children:"Aaron Hawkins 5587 Nunc. Avenue"}),Object(r.jsx)(m.b,{to:"tel:+123456789",children:"(009) 338 148"})]})]})})]})]})}),Object(r.jsxs)("div",{className:"col-lg-6",children:[Object(r.jsxs)("div",{className:"section-title-wrap section-header",children:[Object(r.jsx)("h5",{className:"custom-primary",children:"Contact Us"}),Object(r.jsx)("h2",{className:"title",children:"Got Any Questions?"})]}),Object(r.jsx)("div",{className:"comment-form",children:Object(r.jsxs)("form",{onSubmit:function(e){if(_(!0),e.preventDefault(),C(""),A(""),L(""),E(""),function(){var e=new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(b);if(e||""!==s||""!==a||""!==b||""!==v)if(""===a||a.length<10)A("Please enter a valid 10 digit number!");else if(e&&""!==b){if(""!==v)return!0;E("Message is required!")}else L("Please enter a valid email address!");else C("Name feild is required!"),A("Phone Number is required!"),L("Please enter a valid email address!"),E("Message is required!")}()){var t=x.b+x.a.contactUs,c={email:b,subject:"Test sub",name:s,number:a,message:v};p.a.post(t,c).then((function(e){_(!1),!0===e.data.error?Object(x.e)(e.data.error):Object(x.i)(e.data.title)})).catch((function(){_(!1)}))}else _(!1)},children:[Object(r.jsxs)("div",{className:"row",children:[Object(r.jsxs)("div",{className:"col-md-12 form-group",children:[Object(r.jsx)("label",{children:"Full Name"}),Object(r.jsx)("input",{type:"text",className:"form-control",placeholder:"Full Name",name:"fname",onChange:function(e){return c(e.target.value)}}),Object(r.jsx)("p",{style:{fontSize:"14",color:"red"},children:w})]}),Object(r.jsxs)("div",{className:"col-md-12 form-group",children:[Object(r.jsx)("label",{children:"Phone Number"}),Object(r.jsx)("input",{type:"text",className:"form-control",placeholder:"Phone Number",name:"phone",onChange:function(e){return o(e.target.value)}}),Object(r.jsx)("p",{style:{fontSize:"14",color:"red"},children:T})]}),Object(r.jsxs)("div",{className:"col-md-12 form-group",children:[Object(r.jsx)("label",{children:"Email Address"}),Object(r.jsx)("input",{type:"email",className:"form-control",placeholder:"Email Address",name:"email",onChange:function(e){return h(e.target.value)}}),Object(r.jsx)("p",{style:{fontSize:"14",color:"red"},children:F})]}),Object(r.jsxs)("div",{className:"col-md-12 form-group",children:[Object(r.jsx)("label",{children:"Your Message"}),Object(r.jsx)("textarea",{className:"form-control",placeholder:"Type your message...",name:"comment",rows:7,onChange:function(e){return N(e.target.value)}}),Object(r.jsx)("p",{style:{fontSize:"14",color:"red"},children:M})]})]}),Object(r.jsxs)("button",{type:"submit",className:"btn-custom primary",disabled:z,children:["Send Message",!0===z?Object(r.jsx)("div",{className:"ml-1 spinner-border spinner-border-sm",role:"status",children:Object(r.jsx)("span",{className:"sr-only",children:"Loading..."})}):""]}),Object(r.jsx)(O.a,{})]})})]})]})})})},v=s(207),N=function(e){Object(i.a)(s,e);var t=Object(a.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(n.a)(s,[{key:"render",value:function(){return Object(r.jsx)("div",{className:"section section-padding infographics-3",children:Object(r.jsx)("div",{className:"container",children:Object(r.jsx)("div",{className:"row",children:v.map((function(e,t){return Object(r.jsx)("div",{className:"col-lg-4",children:Object(r.jsxs)("div",{className:"acr-infographic-item",children:[Object(r.jsx)("i",{className:"flaticon-"+e.icon}),Object(r.jsxs)("div",{className:"acr-infographic-item-body",children:[Object(r.jsx)("h5",{children:e.title}),Object(r.jsx)("p",{children:e.text}),Object(r.jsx)(m.b,{target:e.targetBlank,to:{pathname:e.btnurl},className:"btn-custom secondary btn-sm",children:e.btntext})]})]})},t)}))})})})}}]),s}(l.Component),y=function(e){Object(i.a)(s,e);var t=Object(a.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(n.a)(s,[{key:"render",value:function(){return Object(r.jsxs)(l.Fragment,{children:[Object(r.jsx)(N,{}),Object(r.jsx)(f,{})]})}}]),s}(l.Component),k=function(e){Object(i.a)(s,e);var t=Object(a.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(n.a)(s,[{key:"render",value:function(){return Object(r.jsxs)(l.Fragment,{children:[Object(r.jsxs)(j.a,{children:[Object(r.jsx)("title",{children:"Contact us | Neprealestate"}),Object(r.jsx)("meta",{name:"description",content:"#"})]}),Object(r.jsx)(d.a,{}),Object(r.jsx)(b.a,{breadcrumb:{pagename:"Contact Us"}}),Object(r.jsx)(y,{}),Object(r.jsx)(h.a,{})]})}}]),s}(l.Component);t.default=k},55:function(e,t,s){"use strict";var c=s(38),n=s(39),i=s(41),a=s(40),r=s(1),l=s(0),o=s(44),j=s(45),d=s(46),b=s(8),h=s(42),u=s.n(h),m=s(50),O=function(e){Object(i.a)(s,e);var t=Object(a.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(n.a)(s,[{key:"render",value:function(){var e=this.state.isTop?"sticky":"";return Object(r.jsxs)(l.Fragment,{children:[Object(r.jsxs)("aside",{className:u()("main-aside",{open:this.state.navtoggle}),children:[Object(r.jsx)("div",{className:"aside-title",children:Object(r.jsxs)("div",{className:"aside-controls aside-trigger",children:[Object(r.jsx)("h4",{children:"Menu"}),Object(r.jsxs)("div",{className:"close-btn close-dark",onClick:this.navtoggleClass,children:[Object(r.jsx)("span",{}),Object(r.jsx)("span",{})]})]})}),Object(r.jsx)(j.a,{})]}),Object(r.jsx)("div",{className:"aside-overlay aside-trigger",onClick:this.navtoggleClass}),Object(r.jsxs)("header",{className:"main-header header-fw can-sticky  ".concat(e),children:[Object(r.jsx)("div",{className:"top-header",children:Object(r.jsx)("div",{className:"top-header-inner",children:Object(r.jsx)("ul",{className:"top-header-nav",children:Object(r.jsx)("ul",{className:"top-header-nav",children:Object(m.a)()?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("li",{children:[" ",Object(r.jsx)(b.b,{to:"/profile",children:" Profile"})," "]}),Object(r.jsxs)("li",{children:[" ",Object(r.jsx)(b.b,{to:"/logout",children:" Logout"})," "]})]}):Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("li",{children:[" ",Object(r.jsx)(b.b,{to:"/login",children:" Login"})," "]}),Object(r.jsx)("li",{children:"or"}),Object(r.jsxs)("li",{children:[" ",Object(r.jsx)(b.b,{to:"/register",children:" Signup"})," "]})]})})})})}),Object(r.jsxs)("nav",{className:"navbar",children:[Object(r.jsx)(o.a,{}),Object(r.jsxs)("div",{className:"header-controls",children:[Object(r.jsx)("ul",{className:"header-controls-inner d-none d-lg-flex",children:Object(r.jsx)("li",{children:Object(r.jsxs)(b.b,{to:"/add-property",className:"btn-custom primary",children:["Add Property ",Object(r.jsx)("i",{className:"fas fa-plus"})," "]})})}),Object(r.jsxs)("div",{className:"aside-toggler aside-trigger",onClick:this.navtoggleClass,children:[Object(r.jsx)("span",{}),Object(r.jsx)("span",{}),Object(r.jsx)("span",{})]})]})]})]})]})}}]),s}(d.a);t.a=O},56:function(e,t,s){"use strict";var c=s(38),n=s(39),i=s(41),a=s(40),r=s(1),l=s(0),o=s(8),j=function(e){Object(i.a)(s,e);var t=Object(a.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(n.a)(s,[{key:"render",value:function(){return Object(r.jsx)("div",{className:"subheader bg-cover bg-center dark-overlay",style:{backgroundImage:"url(/assets/img/subheader.jpg )"},children:Object(r.jsx)("div",{className:"container",children:Object(r.jsxs)("div",{className:"subheader-inner",children:[Object(r.jsx)("h1",{className:"text-white",children:this.props.breadcrumb.pagename}),Object(r.jsx)("nav",{"aria-label":"breadcrumb",children:Object(r.jsxs)("ol",{className:"breadcrumb",children:[Object(r.jsx)("li",{className:"breadcrumb-item",children:Object(r.jsxs)(o.b,{to:"/",children:[" ",Object(r.jsx)("i",{className:"fas fa-home"})," "]})}),Object(r.jsx)("li",{className:"breadcrumb-item active","aria-current":"page",children:this.props.breadcrumb.pagename})]})})]})})})}}]),s}(l.Component);t.a=j},58:function(e,t,s){"use strict";var c=s(38),n=s(39),i=s(41),a=s(40),r=s(1),l=s(0),o=s(59),j=function(e){Object(i.a)(s,e);var t=Object(a.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(n.a)(s,[{key:"render",value:function(){return Object(r.jsx)("footer",{className:"acr-footer footer-dark",children:Object(r.jsx)(o.a,{})})}}]),s}(l.Component);t.a=j},59:function(e,t,s){"use strict";var c=s(1),n=(s(0),s(8));t.a=function(){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("div",{className:"container",children:Object(c.jsxs)("div",{className:"row",children:[Object(c.jsxs)("div",{className:"col-lg-3 col-md-4 col-sm-12 footer-widget",children:[Object(c.jsx)("div",{className:"footer-logo",style:{width:125},children:Object(c.jsx)("img",{src:"/assets/img/realestaelogo/logo.png",alt:"acres"})}),Object(c.jsx)("p",{children:"Connecting buyers, sellers, and agent effortlessly"}),Object(c.jsxs)("ul",{className:"social-media",children:[Object(c.jsxs)("li",{children:[" ",Object(c.jsxs)(n.b,{to:"#",children:[" ",Object(c.jsx)("i",{className:"fab fa-facebook-f"})," "]})," "]}),Object(c.jsxs)("li",{children:[" ",Object(c.jsxs)(n.b,{to:"#",children:[" ",Object(c.jsx)("i",{className:"fab fa-twitter"})," "]})," "]}),Object(c.jsxs)("li",{children:[" ",Object(c.jsxs)(n.b,{to:"#",children:[" ",Object(c.jsx)("i",{className:"fab fa-pinterest-p"})," "]})," "]}),Object(c.jsxs)("li",{children:[" ",Object(c.jsxs)(n.b,{to:"#",children:[" ",Object(c.jsx)("i",{className:"fab fa-linkedin-in"})," "]})," "]})]})]}),Object(c.jsxs)("div",{className:"col-lg-2 offset-md-1 col-md-4 col-sm-6 footer-widget col-6",children:[Object(c.jsx)("h5",{className:"widget-title",children:"Menu"}),Object(c.jsxs)("ul",{children:[Object(c.jsxs)("li",{children:[" ",Object(c.jsx)(n.b,{to:"/",children:"Find Home"})," "]}),Object(c.jsxs)("li",{children:[" ",Object(c.jsx)(n.b,{to:"/add-property",children:"Add Listing"})," "]}),Object(c.jsxs)("li",{children:[" ",Object(c.jsx)(n.b,{to:"/property-results?property_type=buy",children:"Listings"})," "]}),Object(c.jsxs)("li",{children:[" ",Object(c.jsx)(n.b,{to:"/news",children:"News"})," "]})]})]}),Object(c.jsxs)("div",{className:"col-lg-2 col-md-3 col-sm-6 footer-widget col-6",children:[Object(c.jsx)("h5",{className:"widget-title",children:"Legal"}),Object(c.jsxs)("ul",{children:[Object(c.jsxs)("li",{children:[" ",Object(c.jsx)(n.b,{to:"/privacy-policy",children:"Privacy Policy"})," "]}),Object(c.jsxs)("li",{children:[" ",Object(c.jsx)(n.b,{to:"/terms-and-conditions",children:"Terms & conditions"})," "]}),Object(c.jsxs)("li",{children:[" ",Object(c.jsx)(n.b,{to:"/rent-agreement",children:"Rent Agreement"})," "]}),Object(c.jsxs)("li",{children:[" ",Object(c.jsx)(n.b,{to:"/disclaimers",children:"Disclaimers"})," "]}),Object(c.jsxs)("li",{children:[" ",Object(c.jsx)(n.b,{to:"/user-agreement",children:"User Agreement"})," "]})]})]}),Object(c.jsxs)("div",{className:"col-lg-4 col-md-4 col-sm-6 col-6",children:[Object(c.jsx)("h5",{className:"widget-title",style:{color:"#fff"},children:"Contact us"}),Object(c.jsxs)("ul",{children:[Object(c.jsxs)("li",{children:[" ",Object(c.jsxs)(n.b,{to:"#",children:[Object(c.jsx)("i",{className:"fas fa-home"}),"\xa0\xa0 9- Madhyapur Thimi, Radhe Radhe, Bhaktapur"]})," "]}),Object(c.jsxs)("li",{children:[" ",Object(c.jsxs)(n.b,{target:"_blank",to:{pathname:"tel:977-1-6633484"},children:[Object(c.jsx)("i",{className:"fas fa-phone"}),"\xa0\xa0 977-1-6633484"]})," "]}),Object(c.jsxs)("li",{children:[" ",Object(c.jsxs)(n.b,{to:{pathname:"mailto:info@neprealestate.com"},children:[Object(c.jsx)("i",{className:"fas fa-envelope"}),"\xa0\xa0info@neprealestate.com"]})," "]})]})]})]})}),Object(c.jsx)("div",{className:"footer-bottom",children:Object(c.jsx)("div",{className:"container",children:Object(c.jsxs)("div",{className:"row",children:[Object(c.jsx)("div",{className:"col-lg-7",children:Object(c.jsxs)("p",{className:"m-0",children:["\xa9 Copyright ",(new Date).getFullYear()," - ",Object(c.jsx)(n.b,{to:"/home",children:"Neprealestate"})," All Rights Reserved."]})}),Object(c.jsx)("div",{className:"col-lg-5",children:Object(c.jsx)("ul",{children:Object(c.jsxs)("li",{children:[" ",Object(c.jsx)(n.b,{to:{pathname:"https://worldindia.com"},target:"_blank"})," "]})})})]})})})]})}}}]);
//# sourceMappingURL=53.c393c4f3.chunk.js.map