"use strict";(self["webpackChunkcodequest"]=self["webpackChunkcodequest"]||[]).push([[734],{4734:function(e,l,t){t.r(l),t.d(l,{default:function(){return M}});t(4114);var a=t(6768),r=t(5130),o=t(4232),n=t(144),s=t(1387),u=t(6380);const i={class:"min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4"},c={class:"w-full max-w-md space-y-8"},d={class:"space-y-4"},p={class:"grid grid-cols-2 gap-4"},b={for:"firstName",class:"block text-sm font-medium text-gray-700 mb-1"},f={for:"lastName",class:"block text-sm font-medium text-gray-700 mb-1"},g={for:"email",class:"block text-sm font-medium text-gray-700 mb-1"},m={for:"password",class:"block text-sm font-medium text-gray-700 mb-1"},v={class:"relative"},k={for:"gender",class:"block text-sm font-medium text-gray-700 mb-1"},h={key:0,class:"p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"},y=["disabled"],x={key:0},L={key:1,class:"flex items-center justify-center"};var w=(0,a.pM)({__name:"SignUpPage",setup(e){const l=(0,u.A)(),t=(0,n.KR)(""),w=(0,n.KR)(""),C=(0,n.KR)(""),M=(0,n.KR)(""),E=(0,n.KR)("unspecified"),U=(0,s.rd)(),W=(0,n.KR)(""),q=(0,n.KR)(!1),z=async()=>{try{W.value="",await l.signUp(t.value,w.value,C.value,M.value,E.value),U.push({name:"Login"})}catch(e){e instanceof Error&&(W.value=e.message)}finally{q.value=!1}},A=async()=>{try{W.value="",await l.authenticateWithGoogle()}catch(e){e instanceof Error&&(W.value=e.message)}},K=()=>{U.replace({name:"SignUp"})};return(e,l)=>((0,a.uX)(),(0,a.CE)("div",i,[(0,a.Lk)("div",c,[l[15]||(l[15]=(0,a.Lk)("div",{class:"text-center"},[(0,a.Lk)("h2",{class:"text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"}," Join Lancelot "),(0,a.Lk)("p",{class:"mt-2 text-gray-600"},"Create your account in seconds")],-1)),(0,a.Lk)("form",{onSubmit:(0,r.D$)(z,["prevent"]),class:"bg-white rounded-xl shadow-lg p-8 space-y-6"},[(0,a.Lk)("div",d,[(0,a.Lk)("div",p,[(0,a.Lk)("div",null,[(0,a.Lk)("label",b,[l[5]||(l[5]=(0,a.eW)("First name ")),(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":l[0]||(l[0]=e=>C.value=e),type:"text",required:"",class:"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all",placeholder:"John"},null,512),[[r.Jo,C.value]])])]),(0,a.Lk)("div",null,[(0,a.Lk)("label",f,[l[6]||(l[6]=(0,a.eW)("Last name ")),(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":l[1]||(l[1]=e=>M.value=e),type:"text",required:"",class:"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all",placeholder:"Doe"},null,512),[[r.Jo,M.value]])])])]),(0,a.Lk)("div",null,[(0,a.Lk)("label",g,[l[7]||(l[7]=(0,a.eW)("Email ")),(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":l[2]||(l[2]=e=>t.value=e),type:"email",required:"",class:"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all",placeholder:"john@example.com"},null,512),[[r.Jo,t.value]])])]),(0,a.Lk)("div",null,[(0,a.Lk)("label",m,[l[8]||(l[8]=(0,a.eW)("Password ")),(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":l[3]||(l[3]=e=>w.value=e),type:"password",required:"",class:"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all",placeholder:"••••••••"},null,512),[[r.Jo,w.value]])])]),(0,a.Lk)("div",null,[(0,a.Lk)("div",v,[(0,a.Lk)("label",k,[l[10]||(l[10]=(0,a.eW)("Gender ")),(0,a.bo)((0,a.Lk)("select",{"onUpdate:modelValue":l[4]||(l[4]=e=>E.value=e),required:"",class:"w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"},l[9]||(l[9]=[(0,a.Lk)("option",{value:"",disabled:"",hidden:""},"Select gender",-1),(0,a.Lk)("option",{value:"male"},"Male",-1),(0,a.Lk)("option",{value:"female"},"Female",-1),(0,a.Lk)("option",{value:"other"},"Other",-1)]),512),[[r.u1,E.value]])]),l[11]||(l[11]=(0,a.Lk)("div",{class:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"},[(0,a.Lk)("svg",{class:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[(0,a.Lk)("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 9l-7 7-7-7"})])],-1))])])]),W.value?((0,a.uX)(),(0,a.CE)("div",h,(0,o.v_)(W.value),1)):(0,a.Q3)("",!0),(0,a.Lk)("button",{type:"submit",class:"w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all relative",disabled:q.value},[q.value?((0,a.uX)(),(0,a.CE)("span",L,l[12]||(l[12]=[(0,a.Lk)("svg",{class:"animate-spin h-5 w-5 mr-3 text-white",viewBox:"0 0 24 24"},[(0,a.Lk)("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4",fill:"none"}),(0,a.Lk)("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})],-1),(0,a.eW)(" Creating Account... ")]))):((0,a.uX)(),(0,a.CE)("span",x,"Create Account"))],8,y),(0,a.Lk)("button",{onClick:A,type:"button",class:"w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"},l[13]||(l[13]=[(0,a.Fv)('<svg class="w-5 h-5" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg> Continue with Google ',2)])),(0,a.Lk)("p",{class:"text-center text-gray-600 text-sm"},[l[14]||(l[14]=(0,a.eW)(" Already have an account? ")),(0,a.Lk)("button",{onClick:K,class:"text-blue-600 hover:text-blue-700 font-medium underline transition-colors"}," Log in here ")])],32)])]))}});const C=w;var M=C}}]);
//# sourceMappingURL=734.4db21e92.js.map