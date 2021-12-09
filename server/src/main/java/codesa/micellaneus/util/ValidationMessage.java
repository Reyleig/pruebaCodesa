package codesa.micellaneus.util;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ValidationMessage {

    private String code;
    private String message;
    private String recomen;
}
