interface DataNode {}

interface ContentNode {
  data: DataNode;
  nodeType: string;
}

export interface Description extends ContentNode {
  content: NestedContent[];
}

interface NestedContent extends ContentNode {
  content: TextContent[];
}

interface TextContent extends ContentNode {
  marks: any[];
  value: string;
}
