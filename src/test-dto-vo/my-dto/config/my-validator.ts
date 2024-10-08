import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// 用 @ValidatorConstraint 声明 class 为校验规则，然后实现 ValidatorConstraintInterface 接口
@ValidatorConstraint()
export class MyValidator implements ValidatorConstraintInterface {
  // validate(text: string, validationArguments: ValidationArguments) {
  //   // 第一个参数传入的字段值，第二个参数包含更多信息，比如 @Validate 指定的参数在 constraints 数组里。
  //   console.log(text, validationArguments);

  //   // 比如内容包含 11 的时候才会校验通过
  //   return text.includes(validationArguments.constraints[0]);
  // }

  // 如果校验是异步
  async validate(text: string, validationArguments: ValidationArguments) {
    // console.log(text, validationArguments)
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(text.includes(validationArguments.constraints[0]));
      }, 3000);
    });
  }
}
