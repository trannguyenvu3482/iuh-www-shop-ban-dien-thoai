package com.fit.se.app.repository;

import com.fit.se.app.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query(value = """
            WITH RECURSIVE recursive_category AS (
                -- Start with the given categoryId
                SELECT category_id
                FROM "Category"
                WHERE category_id = :categoryId

                UNION ALL

                -- Recursively find all child categories
                SELECT c.category_id
                FROM "Category" c
                INNER JOIN recursive_category rc ON c.parent_id = rc.category_id
            )
            SELECT category_id
            FROM recursive_category
            WHERE category_id != :categoryId;
            """, nativeQuery = true)
    List<Integer> findAllChildCategoryIds(Integer categoryId);

    List<Category> findByIdIn(List<Integer> ids);
}