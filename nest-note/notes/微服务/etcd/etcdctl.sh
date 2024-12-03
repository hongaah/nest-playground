etcdctl put key value
etcdctl get key
etcdctl del key
etcdctl watch key

# 通过 --prefix 指定前缀的 key 的值
etcdctl get --prefix /services
etcdctl del --prefix /services

etcdctl get --user=root --password=hazel key

