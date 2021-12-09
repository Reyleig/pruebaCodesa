package codesa.micellaneus.exeption;


import codesa.micellaneus.constantes.ValidationMessageEnum;
import codesa.micellaneus.dto.GenericDto;
import codesa.micellaneus.dto.MessageExceptionDto;
import codesa.micellaneus.util.ValidationMessage;
import codesa.micellaneus.util.ValidationMessageUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Log4j2
@RestControllerAdvice
public class AppExceptionHandler {


    @ResponseBody
    @ExceptionHandler(value = BusinessCodesaException.class)
    public ResponseEntity<?> handleException(BusinessCodesaException exception) {
        log.info("[{}] Exception BusinessCodesaException, mensaje: {}", Thread.currentThread().getId(), exception.getMessage());
        MessageExceptionDto exceptionDto = MessageExceptionDto.builder().build();
        exceptionDto.setData(exception.getMessage());

        return ResponseEntity.status(HttpStatus.OK).body(GenericDto.failed(exceptionDto));
    }
}
