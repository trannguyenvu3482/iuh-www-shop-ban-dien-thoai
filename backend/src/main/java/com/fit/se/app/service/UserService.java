package com.fit.se.app.service;

import com.fit.se.app.dto.response.Metadata;
import com.fit.se.app.dto.response.ResPaginationDTO;
import com.fit.se.app.dto.response.UserDTO;
import com.fit.se.app.entity.User;
import com.fit.se.app.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public ResPaginationDTO getUsers(Specification<User> spec, Pageable pageable) {
        Page<User> pageUsers = userRepository.findAll(spec, pageable);

        List<UserDTO> users = pageUsers.getContent().stream().map(user -> {
            System.out.println(user);
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setName(user.getName());
            userDTO.setEmail(user.getEmail());
            userDTO.setPhoneNumber(user.getPhoneNumber());
            userDTO.setAddress(user.getAddress());
            userDTO.setPassword(user.getPassword());
            userDTO.setUserType(user.getUserType().name());
            return userDTO;
        }).toList();

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

}
