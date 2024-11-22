package com.fit.se.app.common.util;

import com.github.slugify.Slugify;

public class StringUtil {
    public static String slugify(String name) {
        final Slugify slg = Slugify.builder().underscoreSeparator(true).build();
        return slg.slugify(name);
    }
}
