
(function ($) {
    "use strict";
   
    let input = $('.validate-input .input100');

   


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });  
   

})(jQuery);

/* USANDO MASK */

$(document).ready(function() {
  $('.telefone').mask('(00) 00000-0000');
  $('.cep').mask('00000-000');
  $('.cpf').mask('000.000.000-00', {reverse: true});  
})

/* USANDO MASK */


/* VALIDANDO CEP */

$(document).ready(function() {

  function limpa_formulário_cep() {
      $("#cidade").val("");
      $("#uf").val("");
  } 
 
  $("#cep").blur(function() {
      var cep = $(this).val().replace(/\D/g, '');   
      if (cep != "") {
          $(".aparecer").css("display", "block");     
          var validacep = /^[0-9]{8}$/;
  
          if(validacep.test(cep)) { 
              
              $("#cidade").val("...");
              $("#uf").val("...");     
 
              $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                  if (!("erro" in dados)) {
            
                      $("#cidade").val(dados.localidade);
                      $("#uf").val(dados.uf);                               
                  } 
                  else {                     
                      limpa_formulário_cep();
                      alert("CEP não encontrado.");
                  }
              });
          } 
          else {             
              limpa_formulário_cep();
              alert("Formato de CEP inválido.");
          }
      } 
      else {         
          limpa_formulário_cep();
      }
  });
});
/* VALIDANDO CEP */


$(".cadastro").on("click", (event)=> {   
    event.preventDefault()
    let email = $("#email").val()  
    let nome = $("#nome").val()  
    let cep = $("#cep").val()  
    let estado = $("#uf").val()  
    let cidade = $("#cidade").val()  
    let cpf = $("#cpf").val()  
    let telefone = $("#telefone").val()  
    let senha = $("#senha").val()  

    localStorage.setItem("email", email);
    localStorage.setItem("nome", nome)
    localStorage.setItem("cep", cep)
    localStorage.setItem("estado", estado)
    localStorage.setItem("cidade", cidade)
    localStorage.setItem("cpf", cpf)
    localStorage.setItem("telefone", telefone)
    localStorage.setItem("senha", senha)

    let input = $('.validate-input .input100');
    let check = true;

    for(let i=0; i<input.length; i++) {
        if(validate(input[i]) == false){
            showValidate(input[i]);
            check=false;
        }
    }
    if (check === true) {
        window.location = "resultado.html"
    } 
   
}) 


function validate (input) {
    if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
        }
    }
    else {
        if($(input).val().trim() == ''){
            return false;
        }
    }
}

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
    
}

$(".resultado").ready(()=> { 

    let resultado = $("#result").append(`

        <div class="resultTela">${localStorage.getItem("email")}</div> 
        <div class="resultTela">${localStorage.getItem("nome")}</div>
        <div class="resultTela">${localStorage.getItem("cep")}</div>
        <div class="resultTela">${localStorage.getItem("estado")}</div>
        <div class="resultTela">${localStorage.getItem("cidade")}</div>
        <div class="resultTela">${localStorage.getItem("cpf")}</div>
        <div class="resultTela">${localStorage.getItem("telefone")}</div>
        <div class="resultTela">${localStorage.getItem("senha")}</div>
    `)

})





