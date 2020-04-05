import { Post } from "../../models/post";

export const fetchPosts = (): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(staticPosts), 2000);
  });
};

const staticPosts = [
  {
    address: "Karolinska universitetssjukhuset, Eugeniavägen, Solna, Sweden",
    title: "Karolinska",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a enim tristique, consequat odio sed, sodales justo. In ac tincidunt diam. Proin dictum, est malesuada commodo consectetur, leo nibh venenatis quam, nec consectetur mi tellus id libero. Vivamus eu risus tempus, faucibus lacus in, venenatis libero. Donec mollis purus eu cursus rhoncus. Sed convallis, dui sit amet euismod viverra, elit augue auctor massa, ut pulvinar mauris odio eu augue. Nam et risus id est placerat viverra id vel velit. Nullam sit amet sagittis est. Duis tincidunt lectus purus, eu posuere mi tincidunt ut. Nullam in augue ut enim bibendum scelerisque nec ut enim. Morbi consectetur arcu dui. Vestibulum sit amet lobortis magna. Aenean facilisis suscipit massa, a consectetur risus mattis a. Sed posuere massa gravida erat porttitor viverra id non tellus. Fusce lobortis sed turpis et porttitor.",
    position: {
      latitude: 59.3486777,
      longitude: 18.0304568,
    },
    id: 1,
    needs: ["Material", "Annat"],
  },
  {
    address: "Södersjukhuset, Sjukhusbacken, Stockholm, Sweden",
    title: "Södersjukhuset",
    description:
      "Quisque iaculis risus risus, et consectetur arcu ultricies vitae. Nullam vitae dui sapien. Nunc laoreet sit amet orci dictum congue. Duis nisl purus, consequat eu turpis sit amet, imperdiet aliquet nibh. Phasellus magna justo, blandit sit amet elit eget, maximus rhoncus velit. Suspendisse molestie tortor purus, id volutpat mi auctor at. Cras porta eu sapien at rutrum. Proin nulla mauris, ullamcorper vel sollicitudin at, gravida nec quam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec viverra accumsan ipsum, vel tempor augue tempus eu. Sed interdum bibendum facilisis. Duis massa augue, congue a purus non, viverra dapibus nisl. Donec tortor ante, gravida vitae ex in, sodales ultricies lacus. Aenean sed elementum sem. Proin laoreet risus eget risus finibus, at pharetra urna placerat. Proin cursus vestibulum pulvinar.",
    position: {
      latitude: 59.30984759999999,
      longitude: 18.0558704,
    },
    id: 2,
    needs: ["Mat"],
  },
  {
    address:
      "Capio Saint Göran's Hospital, Sankt Göransplan, Stockholm, Sweden",
    title: "Capio Saint Göran's Hospital",
    description:
      "Morbi vel consequat mauris. Nam faucibus suscipit dui ac molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ultricies vehicula ipsum id tristique. Nulla facilisi. Integer faucibus nisl nec ante dapibus, non ultricies eros dignissim. Integer dui ex, posuere a diam non, ultrices sodales purus. Curabitur convallis facilisis augue, et dapibus nibh ultrices tincidunt. Integer rutrum erat quis orci porttitor cursus nec et leo. Praesent placerat arcu ut odio mattis, et cursus ante volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus in risus eget enim commodo eleifend at vitae nisi. Sed eu vulputate purus, sit amet dignissim ipsum. Aliquam egestas, velit sit amet viverra imperdiet, orci enim pulvinar enim, euismod dignissim ipsum augue eleifend nisl.",
    position: {
      latitude: 59.33431719999999,
      longitude: 18.0206789,
    },
    id: 3,
    needs: ["Annat"],
  },
  {
    address: "Stockholms Sjukhem, Mariebergsgatan, Stockholm, Sweden",
    title: "Stockholms Sjukhem",
    description:
      "Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce et risus dolor. Nullam id justo ex. Morbi aliquam lorem quis ligula vulputate commodo. Phasellus ex elit, egestas a laoreet sed, lobortis sed metus. Morbi fringilla ullamcorper sem, ut auctor dolor. Duis tristique dapibus feugiat. Maecenas nibh est, dictum a tincidunt vitae, blandit ut lacus.",
    position: {
      latitude: 59.33291180000001,
      longitude: 18.0253904,
    },
    id: 4,
    needs: ["3D printing", "Material"],
  },
  {
    address: "Ersta sjukhus, Fjällgatan, Stockholm, Sweden",
    title: "Ersta sjukhus",
    description:
      "Pellentesque neque dui, ultrices in auctor a, ultrices vitae lectus. Proin ornare a tortor sed mattis. Sed rhoncus ut orci vel consequat. Praesent porta nisl a nulla lacinia tempor. Vestibulum in nulla a neque convallis congue. Etiam convallis nec massa ut commodo. Nulla sed purus id mauris pharetra ornare id sit amet risus. Suspendisse sagittis vel leo id facilisis. Nam et velit eros. Sed sed enim mauris. Fusce blandit nulla eget lorem convallis, sed elementum urna gravida. Vivamus tristique ipsum odio, vel vestibulum arcu accumsan non. Sed a rhoncus nunc. Mauris sit amet ipsum dolor.",
    position: {
      latitude: 59.31690359999999,
      longitude: 18.0888491,
    },
    id: 5,
    needs: ["3D printing"],
  },
];
