import 'reflect-metadata';

const CLASS_KEY = 'ioc:key';

function ClassDecorator() {
  return function (target: any) {
    Reflect.defineMetadata(CLASS_KEY, {
      metaData: 'metaData',
    }, target);
    return target;
  };
}

@ClassDecorator()
class D {
  constructor(){}
}

console.log(Reflect.getMetadata(CLASS_KEY, D)); // => { metaData: 'metaData' }
