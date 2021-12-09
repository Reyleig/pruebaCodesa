package codesa.micellaneus.constantes;

public enum ConstantesEnum {

    SUCCESS("-1", "00");

    private final String code;
    private final String message;

    private ConstantesEnum(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
