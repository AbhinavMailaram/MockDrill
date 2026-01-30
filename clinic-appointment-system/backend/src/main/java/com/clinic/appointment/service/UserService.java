package com.clinic.appointment.service;

import com.clinic.appointment.dto.UserDTO;
import com.clinic.appointment.dto.UserUpdateDTO;
import com.clinic.appointment.model.User;
import com.clinic.appointment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setFullName(userDTO.getFullName());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddress(userDTO.getAddress());
        user.setRole(userDTO.getRole() != null ? userDTO.getRole() : "USER");
        user.setActive(true);
        
        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }
    
    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id).map(this::convertToDTO);
    }
    
    public Optional<UserDTO> getUserByUsername(String username) {
        return userRepository.findByUsername(username).map(this::convertToDTO);
    }
    
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public UserDTO updateUser(Long id, UserUpdateDTO updateDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (updateDTO.getFullName() != null) {
            user.setFullName(updateDTO.getFullName());
        }
        if (updateDTO.getPhoneNumber() != null) {
            user.setPhoneNumber(updateDTO.getPhoneNumber());
        }
        if (updateDTO.getAddress() != null) {
            user.setAddress(updateDTO.getAddress());
        }
        if (updateDTO.getEmail() != null && !updateDTO.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(updateDTO.getEmail())) {
                throw new RuntimeException("Email already exists");
            }
            user.setEmail(updateDTO.getEmail());
        }
        if (updateDTO.getNewPassword() != null && !updateDTO.getNewPassword().isEmpty()) {
            if (updateDTO.getCurrentPassword() == null || 
                !passwordEncoder.matches(updateDTO.getCurrentPassword(), user.getPassword())) {
                throw new RuntimeException("Current password is incorrect");
            }
            user.setPassword(passwordEncoder.encode(updateDTO.getNewPassword()));
        }
        
        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }
    
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }
    
    public User getUserEntityById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setAddress(user.getAddress());
        dto.setRole(user.getRole());
        dto.setActive(user.getActive());
        return dto;
    }
}
