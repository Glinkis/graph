type TagName = keyof HTMLElementTagNameMap;

type Props<Type extends TagName> = Omit<
  Partial<HTMLElementTagNameMap[Type]>,
  "style" | "children"
> & {
  style?: Partial<CSSStyleDeclaration>;
  children?: Node | Node[];
};

export function createElement<Type extends TagName>(
  type: Type,
  { children, ...props }: Props<Type>,
) {
  const element = document.createElement(type);

  Object.assign(element, props);
  if (props.style) {
    Object.assign(element.style, props.style);
  }

  if (children) {
    if (Array.isArray(children)) {
      element.append(...children);
    } else {
      element.append(children);
    }
  }

  return element;
}
