let forms = {};

const getConfig =()=>{
    let defaultConfig = {
        autoLaunch : false,
        name:{
            auto: true,
            value: ''
        },
        email:{
            auto: true,
            value: ''
        },
        phone:{
            auto: true,
            value: ''
        },
        document:{
            auto: true,
            value: ''
        },
        password:{
            auto: true,
            value: ''
        }
    };
    const configFormLocalStorage = localStorage.getItem('FillFormConfig') ? JSON.parse(localStorage.getItem('FillFormConfig')) :  defaultConfig;
    
    const autoLaunch = document.getElementById('auto-launch');
    const nameCheck = document.getElementById('auto-name');
    const nameInput = document.getElementById('name-default')
    const emailCheck = document.getElementById('auto-email');
    const emailInput = document.getElementById('email-default')
    const phoneCheck = document.getElementById('auto-phone');
    const phoneInput = document.getElementById('phone-default')
    const documentCheck = document.getElementById('auto-document');
    const documentInput = document.getElementById('document-default')
    const passwordCheck = document.getElementById('auto-password');
    const passwordInput = document.getElementById('password-default');

    if(configFormLocalStorage.autoLaunch){
        autoLaunch.removeAttribute("checked");        
    }
    else{
        autoLaunch.setAttribute("checked", configFormLocalStorage.autoLaunch);
    }

    if(!configFormLocalStorage.name.auto){
        nameCheck.removeAttribute("checked");
        nameInput.setAttribute("disabled", true);        
        nameInput.value = '';
    }
    else{
        nameCheck.setAttribute("checked", configFormLocalStorage.name.auto);
        nameInput.removeAttribute("disabled");
        
        nameInput.value = configFormLocalStorage.name.value;
    }

    if(!configFormLocalStorage.email.auto){
        emailCheck.removeAttribute("checked");
        emailInput.setAttribute("disabled", true);        
        emailInput.value = '';
    }
    else{
        emailCheck.setAttribute("checked", configFormLocalStorage.email.auto);
        emailInput.removeAttribute("disabled");
        
        emailInput.value = configFormLocalStorage.email.value;
        
    }

    if(!configFormLocalStorage.phone.auto){
        phoneCheck.removeAttribute("checked");
        phoneInput.setAttribute("disabled", true);        
        phoneInput.value = '';
    }
    else{
        phoneCheck.setAttribute("checked", configFormLocalStorage.phone.auto);
        phoneInput.removeAttribute("disabled");
        
        phoneInput.value = configFormLocalStorage.phone.value;
        
    }
    
    if(!configFormLocalStorage.document.auto){
        documentCheck.removeAttribute("checked");
        documentInput.setAttribute("disabled", true);        
        documentInput.value = '';
    }
    else{
        documentCheck.setAttribute("checked", configFormLocalStorage.document.auto);
        documentInput.removeAttribute("disabled");
        
        documentInput.value = configFormLocalStorage.document.value;
        
    }
    
    if(!configFormLocalStorage.password.auto){
        passwordCheck.removeAttribute("checked");
        passwordInput.setAttribute("disabled", true);        
        passwordInput.value = '';
    }
    else{
        passwordCheck.setAttribute("checked", configFormLocalStorage.password.auto);
        passwordInput.removeAttribute("disabled");
        
        passwordInput.value = configFormLocalStorage.password.value;
    } 

    /*name*/
    nameCheck.addEventListener('change', function(){        
        if(this.checked){
            nameInput.setAttribute('disabled', 'true');
            nameInput.value = '';
        }
        else{
            nameInput.removeAttribute('disabled');
        }
    });
    /*email*/
    emailCheck.addEventListener('change', function(){        
        if(this.checked){
            emailInput.setAttribute('disabled', 'true');
            emailInput.value = '';
        }
        else{
            emailInput.removeAttribute('disabled');
        }
    });
    /*phone*/
    phoneCheck.addEventListener('change', function(){        
        if(this.checked){
            phoneInput.setAttribute('disabled', 'true');
            phoneInput.value = '';
        }
        else{
            phoneInput.removeAttribute('disabled');
        }
    });
    /*document*/
    documentCheck.addEventListener('change', function(){        
        if(this.checked){
            documentInput.setAttribute('disabled', 'true');
            documentInput.value = '';
        }
        else{
            documentInput.removeAttribute('disabled');
        }
    });
    /*password*/
    passwordCheck.addEventListener('change', function(){        
        if(this.checked){
            passwordInput.setAttribute('disabled', 'true');
            passwordInput.value = '';
        }
        else{
            passwordInput.removeAttribute('disabled');
        }
    });

    return configFormLocalStorage;
}

const setFillForm = async () => {

    const getNameForApi = async () => {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        return data.results[0];
    }

    if(!document || !document.querySelectorAll("input")) return;

    try {
      let inputs = document.querySelectorAll("input");
      if(inputs.length > 0){
        const data = await getNameForApi();
        const name = data.name.first;
        const email = data.email;
  
        inputs.forEach((item, i) => {

          item.focus();
          item.select();

          const type = item.getAttribute("type");
          const id = item.getAttribute("id");
          
          if(type == "text" && (id=="name" || id=="contact_name_desk")){
            item.value = name;
          }
          else if(type == "email"){
            item.value = email;
          }
          else if(type == "tel"){
            item.value = "930 299 310";
          }
          else if(type == "password"){
            item.value = "Babilonia.123";
          }
          else if(type == "text" && id == "document_number"){
              item.value = "70035252"
          }
          else{
            item.value = '';
          }
          
          if(document.getElementById("btnregister")) document.getElementById("btnregister").removeAttribute("disabled");          
          
        });

        document.body.click();
      }
      
    } catch (error) {
      alert(error);
    }
  }

const onExecuteScripting = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: setFillForm
      }
    );
}

document.getElementById('search-forms').addEventListener('click', onExecuteScripting);

/* save config */

const onSaveConfig = () => {
    
    const autoLaunch = document.getElementById('auto-launch').checked;

    const nameCheck = document.getElementById('auto-name');
    const nameAuto = nameCheck.checked;
    const nameInput = document.getElementById('name-default')
    const nameValue = nameInput.value;

    nameCheck.addEventListener('change', function(){
        console.log(this);
        if(this.checked) nameInput.setAttribute('disable', 'true');
        else
        nameInput.removeAttribute('disable');
    })

    const emailCheck = document.getElementById('auto-email');
    const emailAuto = emailCheck.checked;
    const emailInput = document.getElementById('email-default')
    const emailValue = emailInput.value;

    emailCheck.addEventListener('change', function(){
        if(this.checked) emailInput.setAttribute('disable', 'true');
        else
        emailInput.removeAttribute('disable');
    })


    const phoneCheck = document.getElementById('auto-phone');
    const phoneAuto = phoneCheck.checked;
    const phoneInput = document.getElementById('phone-default')
    const phoneValue = phoneInput.value;

    phoneCheck.addEventListener('change', function(){
        if(this.checked) phoneInput.setAttribute('disable', 'true');
        else
        phoneInput.removeAttribute('disable');
    })


    const documentCheck = document.getElementById('auto-document');
    const documentAuto = documentCheck.checked;
    const documentInput = document.getElementById('document-default')
    const documentValue = documentInput.value;

    documentCheck.addEventListener('change', function(){
        if(this.checked) documentInput.setAttribute('disable', 'true');
        else
        documentInput.removeAttribute('disable');
    })

    const passwordCheck = document.getElementById('auto-password');
    const passwordAuto = passwordCheck.checked;
    const passwordInput = document.getElementById('password-default');
    const passwordValue = passwordInput.value;

    passwordCheck.addEventListener('change', function(){
        if(this.checked) passwordInput.setAttribute('disable', 'true');
        else
        passwordInput.removeAttribute('disable');
    })

    const config = {
        autoLaunch,
        name:{
            auto: nameAuto,
            value: nameValue
        },
        email:{
            auto: emailAuto,
            value: emailValue,
        },
        phone:{
            auto: phoneAuto,
            value: phoneValue,
        },
        document:{
            auto: documentAuto,
            value: documentValue,
        },
        password:{
            auto: passwordAuto,
            value: passwordValue,
        }
    };

    localStorage.setItem('FillFormConfig', JSON.stringify(config));

}

document.getElementById('save-config').addEventListener('click', onSaveConfig);


document.addEventListener('DOMContentLoaded', function () {
    const { autoLaunch } = getConfig();

    if(autoLaunch) onExecuteScripting();
  });

