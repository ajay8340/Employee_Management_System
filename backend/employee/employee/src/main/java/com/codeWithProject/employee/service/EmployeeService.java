package com.codeWithProject.employee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codeWithProject.employee.entity.Employee;
import com.codeWithProject.employee.repository.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;


@Service
public class EmployeeService {
    
	 @Autowired
	 EmployeeRepository employeeRepository;

	
	public Employee postEmployee(Employee employee) {
		return employeeRepository.save(employee);
	}
	
	public List<Employee> getAllEmployee() {
		return employeeRepository.findAll();
	}
	
	public void deleteEmployee(Long id) {
		if(!employeeRepository.existsById(id)) {
			throw new EntityNotFoundException("Employee with ID " + id + " not found");
			
		}
		
		employeeRepository.deleteById(id);
	}
	
	public Employee getEmployeeById(Long id) {
		return employeeRepository.findById(id).orElse(null);
	}
	
	public Employee updateEmployee(Long id, Employee employeeDetails) {
	    return employeeRepository.findById(id)
	        .map(existingEmployee -> {
	            // Sirf non-null aur non-empty values update karo
	            if (employeeDetails.getName() != null && !employeeDetails.getName().isEmpty()) {
	                existingEmployee.setName(employeeDetails.getName());
	            }
	            if (employeeDetails.getEmail() != null && !employeeDetails.getEmail().isEmpty()) {
	                existingEmployee.setEmail(employeeDetails.getEmail());
	            }
	            if (employeeDetails.getPhone() != null && !employeeDetails.getPhone().isEmpty()) {
	                existingEmployee.setPhone(employeeDetails.getPhone());
	            }
	            if (employeeDetails.getDepartment() != null && !employeeDetails.getDepartment().isEmpty()) {
	                existingEmployee.setDepartment(employeeDetails.getDepartment());
	            }

	            return employeeRepository.save(existingEmployee);
	        })
	        .orElseThrow(() -> new EntityNotFoundException("Employee with ID " + id + " not found"));
	}


}













