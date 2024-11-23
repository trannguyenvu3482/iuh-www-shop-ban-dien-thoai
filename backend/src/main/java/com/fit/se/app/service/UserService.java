package com.fit.se.app.service;

import com.fit.se.app.dto.response.Metadata;
import com.fit.se.app.dto.response.ResPaginationDTO;
import com.fit.se.app.dto.response.UserDTO;
import com.fit.se.app.entity.User;
import com.fit.se.app.mapper.UserMapper;
import com.fit.se.app.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserDTO saveUser(User user) {
        User createdUser = userRepository.save(user);

        return userMapper.toUserDTO(createdUser);
    }

    public UserDTO getUserById(Integer id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userMapper.toUserDTO(userOptional.orElse(null));
    }

    public User getUserByEmail(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("Không tìm thấy người dùng với email: " + email);
        } else {
            return user;
        }

    }

    public ResPaginationDTO getUsers(Specification<User> spec, Pageable pageable) {
        Page<User> pageUsers = userRepository.findAll(spec, pageable);

        List<UserDTO> users = userMapper.toUserDTOs(pageUsers.getContent());

        ResPaginationDTO resPaginationDTO = new ResPaginationDTO();
        Metadata metadata = new Metadata();

        metadata.setPage(pageable.getPageNumber() + 1);
        metadata.setPageSize(pageable.getPageSize());
        metadata.setTotalPages(pageUsers.getTotalPages());
        metadata.setTotalItems(pageUsers.getTotalElements());

        resPaginationDTO.setMetadata(metadata);
        resPaginationDTO.setResult(users);

        return resPaginationDTO;
    }

    public User updateUser(User user) {
        Optional<User> userOptional = userRepository.findById(user.getId());
        if (userOptional.isPresent()) {
            User updatedUser = userOptional.get();
            updatedUser.setName(user.getName());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPhoneNumber(user.getPhoneNumber());
            updatedUser.setAddress(user.getAddress());
            updatedUser.setPassword(user.getPassword());
            updatedUser.setUserType(user.getUserType());
            return userRepository.save(updatedUser);
        }
        return null;
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    public void updateUserToken(String token, String email) {
        User user = this.userRepository.findByEmail(email);

        user.setRefreshToken(token);
        this.userRepository.save(user);
    }

    public User getUserByRefreshTokenAndEmail(String token, String email) {
        return this.userRepository.findByRefreshTokenAndEmail(token, email);
    }
}
