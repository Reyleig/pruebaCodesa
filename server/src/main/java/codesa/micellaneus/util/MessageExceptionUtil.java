package codesa.micellaneus.util;

import codesa.micellaneus.constantes.ValidationMessageEnum;
import codesa.micellaneus.dto.MessageExceptionDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class MessageExceptionUtil {

    @Autowired
    private ValidationMessageUtil validationMessageUtil;

    private ValidationMessage loadValidationMessage(ValidationMessageEnum validationMessageEnum) {
        return validationMessageUtil.loadMessage(validationMessageEnum);
    }

    public String resolveMessage(ValidationMessageEnum messageEnum) {
        MessageExceptionDto exceptionDto = MessageExceptionDto.builder().build();
        ValidationMessage validationMessage = loadValidationMessage(messageEnum);
        exceptionDto.setValidationMessage(validationMessage);

        ObjectMapper Obj = new ObjectMapper();
        String jsonStr = null;

        try {
            jsonStr = Obj.writeValueAsString(exceptionDto);
        } catch (IOException exception) {
            log.error("[{}] Error obteniendo JSON: dto:{}, message: {} ", Thread.currentThread().getId(), exceptionDto, exception);
        }

        return jsonStr;
    }


}
