package codesa.service;

import codesa.micellaneus.dto.UserDto;

import java.util.List;


public interface CodesaService {

    List<UserDto> getAllUsers();

    List<UserDto> getUserByText(UserDto userDto);

    boolean updateUser(UserDto userDto);

    boolean deleteUser(int idUsuario);

    boolean createUser(UserDto userDto);
}
