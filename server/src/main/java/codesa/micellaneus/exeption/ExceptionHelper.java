package codesa.micellaneus.exeption;

public class ExceptionHelper {

    public static void procesar(Exception e, String messageException) {
        if (e instanceof BusinessCodesaException) {
            throw (RuntimeException) e;
        }

        throw new BusinessCodesaException(
                messageException, e);
    }
}
