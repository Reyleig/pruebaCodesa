package codesa.micellaneus.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserDto {

    @JsonProperty("id_usuario")
    private int idUsuario;
    @JsonProperty("id_rol")
    private int idRol;
    private String nombre;
    private String activo;
    @JsonProperty("nombre_rol")
    private String nombreRol;
}
