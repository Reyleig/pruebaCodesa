package codesa.micellaneus.util;

import codesa.micellaneus.constantes.ValidationMessageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Locale;

@Component
public class ValidationMessageUtil {



    @Autowired
    private MessageSource messageValidationSource;

    private MessageSourceAccessor accessor;

    @PostConstruct
    private void init() {
        accessor = new MessageSourceAccessor(messageValidationSource, Locale.getDefault());
    }

    public ValidationMessage loadMessage(ValidationMessageEnum validation) {
        String code = accessor.getMessage(validation.getCode());
        String message = accessor.getMessage(validation.getMessage());
        String recom = accessor.getMessage(validation.getRecomen());

        ValidationMessage validationMessage = ValidationMessage
                .builder()
                .code(code)
                .message(message)
                .recomen(recom)
                .build();

        return validationMessage;
    }
}
