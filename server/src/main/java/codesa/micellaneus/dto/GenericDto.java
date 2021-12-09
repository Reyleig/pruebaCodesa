package codesa.micellaneus.dto;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class GenericDto {

    private Integer status;
    private Object payload;


    public static GenericDto sucess(Object data) {

        GenericDto genericDto = new GenericDto();
        //genericDto.setStatus(HttpStatus.OK.toString());
        genericDto.setStatus(HttpStatus.OK.value());
        genericDto.setPayload(data);

        return genericDto;
    }

    public static GenericDto failed(Object data) {
        GenericDto genericDto = new GenericDto();
        genericDto.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        genericDto.setPayload(data);

        return genericDto;
    }

}
