const inlineMath=document.querySelector(".math-inline"),blockMath=document.querySelector(".math-block"),writableCanvas=document.querySelector(".write"),displayCanvas=document.querySelector(".display"),buttons=document.getElementsByClassName("math-button"),hide=document.querySelector(".hide-button"),buttonsSection=document.querySelector(".buttons"),minimizedButtons=document.querySelector(".minimized-buttons"),maxButton=document.querySelector(".maximise"),quitPreviewButton=document.querySelector(".quit-preview-button"),AddMathButton=document.querySelector(".add-math-button"),newLineButton=document.querySelector(".newline"),showButton=document.querySelector(".show-buttons"),minMaxButton=document.querySelector(".min-preview"),saveButton=document.querySelector(".save-button"),minSaveButton=document.querySelector(".min-save"),bold=document.querySelector(".bold"),italic=document.querySelector(".italic"),underline=document.querySelector(".underline"),maximiseButtons=[maxButton,minMaxButton],formatButtons=[bold,italic,underline],saveButtons=[saveButton,minSaveButton],inlineChar="$",blockChar="$$";let currentChar="$",isActive=!1,activatedButtons=[],cursorElement;const symbols={"not-equals":"\\neq ",multiply:"\\times ",divide:"\\div ","plus-minus":"\\pm ","dot-product":"\\cdot ",frac:"\\frac{}{}",sqrt:"\\sqrt{}","nth-root":"\\sqrt[]{}",square:"^2 ",power:"^{}",log:"\\log_{}{}",ln:"\\ln{}",union:"\\cup ",abs:"|{}|",percent:"\\% ",intersection:"\\cap ",inf:"\\infty ",deg:"\xb0 ",sin:"\\sin{}",cos:"\\cos{}",tan:"\\tan{}",csc:"\\csc{}",sec:"\\sec{}",cot:"\\cot{}",asin:"\\arcsin{}",acos:"\\arccos{}",atan:"\\arctan{}",sinh:"\\sinh{}",cosh:"\\cosh{}",tanh:"\\tanh{}",pi:"\\pi ",tau:"\\tau ",alpha:"\\alpha ",beta:"\\beta ",gamma:"\\gamma ",delta:"\\delta ",Delta:"\\Delta ",theta:"\\theta ",mu:"\\mu ",epsilon:"\\varepsilon ",lambda:"\\lambda ",rho:"\\rho ",sigma:"\\sigma ",ell:"\\ell ",phi:"\\Phi ",omega:"\\omega ",Gamma:"\\Gamma ",Omega:"\\Omega ",system:"\\begin{cases} \n {} \\\\ \n {} \n\\end{cases}",sum:"\\sum_{ = }^{}",product:"\\prod_{ = }^{}",limit:"\\lim_{x \\to {}}",derivative:"\\frac{d}{dx}","partial-derivative":"\\frac{\\partial}{\\partial x}",integral:"\\int ","definite-integral":"\\int_{}^{}","double-integral":"\\iint ","triple-integral":"\\iiint ",nabla:"\\nabla ","contour-integral":"\\oint",scientific:"10^{}",sub:"_{}","vector-a":"\\vec{}",implies:"\\Rightarrow ",in:"\\in ","not-in":"\\notin ",subset:"\\subset ",superset:"\\supset ",exists:"\\exists ","not-exists":"\\nexists ",forall:"\\forall ",negation:"\\neg ",and:"\\land ",or:"\\lor ",iff:"\\Leftrightarrow ",angle:"\\angle ","right-angle":"\\angle ",choose:"{}\\choose{}",perpendicular:"\\perp ",parallel:"\\parallel ",congruent:"\\equiv ",similar:"\\sim ","segment-ab":"\\overline{}","angle-ab":"\\widehat{}",naturals:"\\mathbb{N} ",integers:"\\mathbb{Z} ",rationals:"\\mathbb{Q} ",real:"\\mathbb{R} ",complex:"\\mathbb{C} ",empty:"\\varnothing "};function isInsideMath(e){if(e.length>0){let t=e.split(""),a=0;for(let n=0;n<t.length;n++)"$"==t[n]&&"$"!=t[n-1]&&(a+=1);return a%2}return!1}function replaceNewLine(){let e=writableCanvas.selectionStart,t=writableCanvas.selectionEnd,a=writableCanvas.value,n=a.slice(0,e)+" <>"+a.slice(t);writableCanvas.value=n,writableCanvas.selectionStart=writableCanvas.selectionEnd=e+3}function addToTextArea(e,t,a=0){let n;if(void 0!=cursorElement){let l=cursorElement.selectionStart,r=cursorElement.selectionEnd,s=cursorElement.value,o=s.substring(0,l),c=s.substring(r),u=isInsideMath(o);n=u?t:e,o.length>0&&![" ","{"].includes(o[o.length-1])&&(n=" "+n);let d=-1!=n.indexOf("{")?n.indexOf("{"):n.length-2;if(u&&(-1==n.indexOf("{")?d+=2:d+=1),1==a){let m=0;d-=m="$"==currentChar?1:2}else 2==a?d-=3:u||(d+=1);let h=l+d;cursorElement.value=o+n+c,cursorElement.focus(),cursorElement.setSelectionRange(h,h)}else writableCanvas.innerHTML=writableCanvas.innerHTML+n,writableCanvas.focus(),writableCanvas.setSelectionRange(writableCanvas.innerHTML.length)}blockMath.addEventListener("click",()=>{blockMath.style.backgroundColor="var(--azure)",inlineMath.style.backgroundColor="var(--light-cyan)",currentChar="$$"}),inlineMath.addEventListener("click",()=>{inlineMath.style.backgroundColor="var(--azure)",blockMath.style.backgroundColor="var(--light-cyan)",currentChar="$"}),document.addEventListener("focusin",function(e){"textarea"===e.target.tagName.toLowerCase()&&(cursorElement=e.target)});for(let i=0;i<buttons.length;i++)buttons[i].addEventListener("click",function(){let e=symbols[buttons[i].id];addToTextArea(`${currentChar}${e}${currentChar}`,e)});hide.addEventListener("click",()=>{buttonsSection.classList.add("hidden"),minimizedButtons.classList.remove("hidden"),displayCanvas.classList.add("auto-height"),writableCanvas.classList.add("auto-height")}),showButton.addEventListener("click",()=>{buttonsSection.classList.remove("hidden"),minimizedButtons.classList.add("hidden"),displayCanvas.classList.remove("auto-height"),writableCanvas.classList.remove("auto-height")}),maximiseButtons.forEach(e=>{e.addEventListener("click",()=>{displayCanvas.classList.add("maxed"),quitPreviewButton.classList.remove("hidden")})}),quitPreviewButton.addEventListener("click",()=>{displayCanvas.classList.remove("maxed"),quitPreviewButton.classList.add("hidden")}),AddMathButton.addEventListener("click",()=>{addToTextArea(`${currentChar}  ${currentChar}`,"",!0)});let timeout,cleanedValue="";["focus","input"].forEach(e=>{writableCanvas.addEventListener(e,()=>{clearTimeout(timeout),timeout=setTimeout(()=>{cleanedValue=writableCanvas.value.replaceAll("\n","").replaceAll(" <>","\n").replaceAll("/B/","<b>").replaceAll("/I/","<i>").replaceAll("/U/","<u>").replaceAll("\\B\\","</b>").replaceAll("\\I\\","</i>").replaceAll("\\U\\","</u>"),displayCanvas.innerHTML=cleanedValue,MathJax.typesetPromise([displayCanvas])},100)})}),writableCanvas.addEventListener("keydown",function(e){"Enter"===e.key&&e.getModifierState("Shift")&&replaceNewLine()}),newLineButton.addEventListener("click",function(e){replaceNewLine(),addToTextArea("\n","\n")}),formatButtons.forEach(e=>{e.addEventListener("click",function(t){addToTextArea(`/${e.textContent}/  \\${e.textContent}\\`,`/${e.textContent}/  \\${e.textContent}\\`,2)})}),saveButtons.forEach(e=>{e.addEventListener("click",()=>{let e=prompt("Inserire il nome del file: ")+".txt";if("null.txt"!=e){let t=new Blob([cleanedValue],{type:"text/plain"}),a=URL.createObjectURL(t),n=document.createElement("a");n.setAttribute("href",a),n.setAttribute("download",e),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(a)}})});
