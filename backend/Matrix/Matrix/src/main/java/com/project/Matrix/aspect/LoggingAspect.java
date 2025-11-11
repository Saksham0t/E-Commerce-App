package com.project.Matrix.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Arrays;

@Component
@Aspect
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Around("execution(* com.project.Matrix.service.CartItemService.*(..))")
    public Object log(ProceedingJoinPoint joinPoint) throws Throwable {
        logger.info("Method called: {}", joinPoint.getSignature().toShortString());
        logger.info("Arguments: {}", Arrays.toString(joinPoint.getArgs()));

        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long end = System.currentTimeMillis();

        logger.info("Method finished: {}", joinPoint.getSignature().toShortString());
        logger.info("Execution time: {} ms", (end - start));
        logger.info("Returned: {}", result);

        return result;
    }
}