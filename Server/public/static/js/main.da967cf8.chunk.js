(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{48:function(e,t,n){e.exports=n(92)},53:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},89:function(e,t){},92:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(45),l=n.n(c),i=(n(53),n(7)),u=n(8),o=n(10),s=n(9),p=n(13),m=n(1),h=n(17),f=(n(54),n(55),function(e){Object(o.a)(n,e);var t=Object(s.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:"Button"},r.a.createElement(p.b,{to:this.props.location,className:"Redirect"},this.props.value))}}]),n}(a.Component)),v=function(e){Object(o.a)(n,e);var t=Object(s.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).handleChange=a.handleChange.bind(Object(h.a)(a)),a}return Object(u.a)(n,[{key:"handleChange",value:function(e){this.props.App.setState({username:e.target.value})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"Current Username:",r.a.createElement("input",{type:"text",value:this.props.App.state.username,onChange:this.handleChange})),r.a.createElement(f,{location:"Test",value:"Go To Time Display"}))}}]),n}(a.Component),b=function(e){Object(o.a)(n,e);var t=Object(s.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"Username: ",this.props.App.state.username),r.a.createElement(f,{location:"/",value:"Go To Username Selection"}),r.a.createElement("h1",null,"Current Time:",r.a.createElement("time",{dateTime:this.props.App.state.timestamp}," ",this.props.App.state.timestamp)))}}]),n}(a.Component),d=n(47),E=n.n(d),j=function(e){Object(o.a)(n,e);var t=Object(s.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={timestamp:0,username:""},a}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=E()("http://localhost:4000");return t.on("FromAPI",(function(t){e.setState({timestamp:t})})),function(){return t.disconnect()}}},{key:"render",value:function(){return r.a.createElement(p.a,null,r.a.createElement(m.c,null,r.a.createElement(m.a,{exact:!0,path:"/"},r.a.createElement(v,{App:this})),r.a.createElement(m.a,{path:"/Test"},r.a.createElement(b,{App:this}))))}}]),n}(a.Component);l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root"))}},[[48,1,2]]]);
//# sourceMappingURL=main.da967cf8.chunk.js.map